import { useEffect, useRef, useState } from "react";
import { Block } from "./LessonContent";
import CodeBlock from "./CodeBlock";

const RUN_TIMEOUT = 1200;

// 実習エリアの見た目（is-pass / is-fail など、レッスン共通のクラス）。
const SANDBOX_STYLE = `
  body { margin: 0; padding: 16px; background: #f7f7ef; color: #0a0a0a; font: 14px/1.7 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  ul, ol { margin: 0; padding: 0; list-style: none; }
  li { padding: 12px 16px; margin-bottom: 8px; background: #fff; border-left: 4px solid #aaa; }
  li.is-pass { border-left-color: #d6ff3f; font-weight: 700; }
  li.is-fail { border-left-color: #d13939; color: #a33; }
`;

const LOOP_GUARD_LIMIT = 100000;

// iframeはWorkerと違って同じスレッドで動くため、無限ループを書かれるとタブごと固まる。
// for / while の先頭に反復回数チェックを挟み込み、暴走したら例外で止める。
function guardLoops(code) {
  const guarded = code.replace(/((?:for|while)\s*\([^)]*\)\s*)\{/g, (match, head) => {
    return `${head}{ if (++__loopGuard__ > ${LOOP_GUARD_LIMIT}) { throw new Error("繰り返しが多すぎるため停止しました。ループの条件を見直してみてください。"); }`;
  });
  return `let __loopGuard__ = 0;\n${guarded}`;
}

function buildSrcDoc(html, code, shouldRun) {
  const script = shouldRun
    ? `<script>
    const send = (type, value) => parent.postMessage({ __domPlayground: true, type, value }, "*");
    const console = {
      log: (...values) => send("log", values.map((value) => {
        if (typeof value === "string") return value;
        if (typeof value === "undefined") return "undefined";
        if (typeof value === "function") return value.toString();
        try { return JSON.stringify(value); } catch { return String(value); }
      }).join(" "))
    };
    const alert = () => { throw new Error("alert はこの実習エリアでは使えません"); };
    const confirm = () => { throw new Error("confirm はこの実習エリアでは使えません"); };
    const prompt = () => { throw new Error("prompt はこの実習エリアでは使えません"); };

    try {
      Function("console", "alert", "confirm", "prompt", ${JSON.stringify(guardLoops(code))})(
        console,
        alert,
        confirm,
        prompt
      );
      send("html", document.getElementById("__stage__").innerHTML);
      send("done");
    } catch (error) {
      send("html", document.getElementById("__stage__").innerHTML);
      send("error", error && error.message ? error.message : String(error));
    }
  </script>`
    : "";

  return `<!doctype html><html><head><meta charset="utf-8"><style>${SANDBOX_STYLE}</style></head><body><div id="__stage__">${html}</div>${script}</body></html>`;
}

// innerHTMLはタグが詰まって返ってくるので、要素ごとに改行してざっくり読みやすくする。
// ul > li 程度のシンプルな入れ子しか想定していない簡易整形。
function formatHtml(html) {
  const trimmed = html.trim();
  if (!trimmed) return trimmed;

  let depth = 0;
  return trimmed
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .map((line) => {
      const isClosingTag = /^<\/[a-z]/i.test(line);
      const isSelfContained = /^<([a-z][a-z0-9]*)\b[^>]*>.*<\/\1>$/i.test(line);
      const isOpeningTag = /^<[a-z][^>]*[^/]>$/i.test(line) && !isSelfContained;

      if (isClosingTag) depth = Math.max(depth - 1, 0);
      const indented = "  ".repeat(depth) + line;
      if (isOpeningTag) depth += 1;
      return indented;
    })
    .join("\n");
}

export default function DomPlayground({ html, initialCode }) {
  const [code, setCode] = useState(initialCode);
  // iframeのsrcDocはexecutedCodeからだけ作る。codeは編集中の値なので、
  // ここに直結すると入力のたびにiframeが再読み込み・再実行されてしまう。
  const [executedCode, setExecutedCode] = useState(initialCode);
  const [runId, setRunId] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const [status, setStatus] = useState("idle");
  const [logs, setLogs] = useState([]);
  const [renderedHtml, setRenderedHtml] = useState(html);
  const [viewMode, setViewMode] = useState("preview");
  const iframeRef = useRef(null);
  const logsRef = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || event.data.__domPlayground !== true) return;
      if (event.source !== iframeRef.current?.contentWindow) return;

      const { type, value } = event.data;
      if (type === "log") {
        logsRef.current = [...logsRef.current, value];
        setLogs(logsRef.current);
        return;
      }
      if (type === "html") {
        setRenderedHtml(value);
        return;
      }

      window.clearTimeout(timeoutRef.current);
      setStatus(type === "error" ? "error" : "success");
      if (type === "error") {
        logsRef.current = [...logsRef.current, value];
        setLogs(logsRef.current);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [runId]);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const run = () => {
    logsRef.current = [];
    setLogs([]);
    setStatus("running");
    setHasRun(true);
    setExecutedCode(code);
    setRunId((id) => id + 1);

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setStatus("error");
      setLogs((current) => [...current, "実行が長く続いたため停止しました。繰り返し条件を見直してみてください。"]);
      setHasRun(false);
      setRunId((id) => id + 1);
    }, RUN_TIMEOUT);
  };

  const reset = () => {
    window.clearTimeout(timeoutRef.current);
    setCode(initialCode);
    setExecutedCode(initialCode);
    logsRef.current = [];
    setLogs([]);
    setStatus("idle");
    setHasRun(false);
    setRenderedHtml(html);
    setRunId((id) => id + 1);
  };

  return (
    <Block label="実際に動かして確認">
      <div className="dom-playground">
        <div className="dom-playground-head">
          <p>ここで書いたコードが、下の実習エリアの本物のDOMを書き換えます。</p>
          <button type="button" onClick={reset} className="playground-reset">
            リセット
          </button>
        </div>

        <CodeBlock
          className="playground-editor"
          code={code}
          language="javascript"
          onChange={setCode}
          minHeight="200px"
          ariaLabel="実習コード"
        />

        <div className="playground-actions">
          <button type="button" onClick={run} disabled={status === "running"} className="playground-run">
            {status === "running" ? "実行中" : "実行"}
          </button>
        </div>

        {logs.length > 0 && (
          <div className={`playground-output is-${status}`} aria-live="polite">
            {logs.map((line, index) => (
              <pre key={`${line}-${index}`}>{line}</pre>
            ))}
          </div>
        )}

        <div className="dom-playground-preview-head">
          <p className="dom-playground-caption">実習エリア（実際のHTML）</p>
          <div className="dom-playground-view-toggle" role="tablist" aria-label="表示切り替え">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "preview"}
              className={viewMode === "preview" ? "is-active" : ""}
              onClick={() => setViewMode("preview")}
            >
              見た目
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "html"}
              className={viewMode === "html" ? "is-active" : ""}
              onClick={() => setViewMode("html")}
            >
              HTMLコード
            </button>
          </div>
        </div>

        {/* タブ切り替えでiframeを消すと再マウント＝再実行されてしまうため、
            両方を常にマウントしたままCSSで表示・非表示だけ切り替える。 */}
        <iframe
          key={runId}
          ref={iframeRef}
          className="dom-playground-frame"
          hidden={viewMode !== "preview"}
          title="DOM実習エリア"
          sandbox="allow-scripts"
          srcDoc={buildSrcDoc(html, executedCode, hasRun)}
        />
        <CodeBlock
          className="dom-playground-html"
          code={formatHtml(renderedHtml)}
          language="html"
          height="200px"
          hidden={viewMode !== "html"}
        />
      </div>
    </Block>
  );
}

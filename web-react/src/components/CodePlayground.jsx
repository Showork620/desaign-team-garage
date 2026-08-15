import { useMemo, useState } from "react";
import { Block } from "./LessonContent";
import CodeBlock from "./CodeBlock";

const RUN_TIMEOUT = 1200;

function stringifyLogValue(value) {
  if (typeof value === "string") return value;
  if (typeof value === "undefined") return "undefined";
  if (typeof value === "function") return value.toString();
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function createRunnerSource(code) {
  return `
    const send = (type, value) => self.postMessage({ type, value });
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
      // 学習サイト内の短い実習コードを動かすための評価処理です。
      // 入力コードを実行する仕組みなので、この用途以外へ流用しません。
      Function("console", "alert", "confirm", "prompt", ${JSON.stringify(code)})(
        console,
        alert,
        confirm,
        prompt
      );
      send("done");
    } catch (error) {
      send("error", error && error.message ? error.message : String(error));
    }
  `;
}

function runUserCode(code) {
  return new Promise((resolve) => {
    const logs = [];
    const blob = new Blob([createRunnerSource(code)], { type: "text/javascript" });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);

    const cleanup = () => {
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
    };

    const timer = window.setTimeout(() => {
      cleanup();
      resolve({
        status: "error",
        lines: [...logs, "実行が長く続いたため停止しました。繰り返し条件を見直してみてください。"],
      });
    }, RUN_TIMEOUT);

    worker.onmessage = (event) => {
      const { type, value } = event.data;
      if (type === "log") {
        logs.push(value);
        return;
      }

      window.clearTimeout(timer);
      cleanup();
      if (type === "error") {
        resolve({ status: "error", lines: [...logs, value] });
      } else {
        resolve({ status: "success", lines: logs.length > 0 ? logs : ["（出力はありません）"] });
      }
    };

    worker.onerror = (error) => {
      window.clearTimeout(timer);
      cleanup();
      resolve({ status: "error", lines: [...logs, error.message] });
    };
  });
}

export default function CodePlayground({ initialCode = "", examples: rawExamples, itemTitle }) {
  const examples = useMemo(() => rawExamples ?? [], [rawExamples]);
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState({ status: "idle", lines: ["実行すると結果がここに表示されます。"] });
  const [isRunning, setIsRunning] = useState(false);

  const run = async () => {
    setIsRunning(true);
    setResult({ status: "running", lines: ["実行中..."] });
    const nextResult = await runUserCode(code);
    setResult(nextResult);
    setIsRunning(false);
  };

  return (
    <Block label="ブラウザで試す">
      <div className="code-playground">
        <div className="playground-head">
          <p>
            <b>{itemTitle}</b>のコードをここで書き換えて試せます。
          </p>
          <button type="button" onClick={() => setCode(initialCode)} className="playground-reset">
            リセット
          </button>
        </div>

        {examples.length > 0 && (
          <div className="playground-examples" aria-label="練習コード">
            {examples.map((example) => (
              <button type="button" key={example.label} onClick={() => setCode(example.code)}>
                {example.label}
              </button>
            ))}
          </div>
        )}

        <CodeBlock
          className="playground-editor"
          code={code}
          language="javascript"
          onChange={setCode}
          minHeight="220px"
          ariaLabel={`${itemTitle}の実習コード`}
        />

        <div className="playground-actions">
          <button type="button" onClick={run} disabled={isRunning} className="playground-run">
            {isRunning ? "実行中" : "実行"}
          </button>
        </div>

        <div className={`playground-output is-${result.status}`} aria-live="polite">
          {result.lines.map((line, index) => (
            <pre key={`${line}-${index}`}>{stringifyLogValue(line)}</pre>
          ))}
        </div>
      </div>
    </Block>
  );
}

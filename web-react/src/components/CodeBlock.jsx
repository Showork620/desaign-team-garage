import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { githubDark } from "@uiw/codemirror-theme-github";
import { EditorView } from "@codemirror/view";

const LANGUAGE_EXTENSIONS = {
  javascript: javascript(),
  html: html(),
};

// シンタックスハイライト付きのコードブロック。
// onChangeを渡さなければ表示専用（教科書のコード例・使用するHTML・完成イメージ）、
// 渡せば編集可能な実習用エディタ（CodePlayground / DomPlayground）として使う。
export default function CodeBlock({
  code,
  language = "javascript",
  className = "",
  onChange,
  ariaLabel,
  height,
  minHeight,
  hidden,
}) {
  const editable = typeof onChange === "function";

  return (
    <div className={`code-block ${className}`.trim()} hidden={hidden}>
      <CodeMirror
        value={code}
        theme={githubDark}
        editable={editable}
        readOnly={!editable}
        onChange={onChange}
        height={height}
        minHeight={minHeight}
        aria-label={ariaLabel}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: editable,
          highlightActiveLineGutter: false,
        }}
        extensions={[LANGUAGE_EXTENSIONS[language], EditorView.lineWrapping]}
      />
    </div>
  );
}

// JavaScript カテゴリの解説本文。
// 1項目 = what / why / code / practice / pitfalls / links の5ブロック構成。
// 追記するときは、この形をそのまま真似すれば表示側の修正は不要。

const javascriptLessons = {
  "js-variable": {
    what: "値に名前をつけて、あとから何度でも呼び出せるようにする「箱」です。デザインツールでカラースタイルやテキストスタイルに名前をつけて登録しておくのと、考え方はほとんど同じ。",
    why: "同じ値をあちこちに直接書くと、変更のたびに全部を探して直すことになります。変数にしておけば、宣言した1か所を直すだけで、使っている場所すべてに反映されます。",
    code: {
      caption: "const（変わらない値）と let（あとで変わる値）",
      body: `const siteName = "WEB BUILD LOG"; // あとから変えない値
let count = 0;                     // あとから変わる値

count = count + 1;

console.log(siteName, count); // → WEB BUILD LOG 1`,
    },
    practice: [
      "自分の名前を入れた変数 name を作って、console.log(name) で表示してみる。",
      "const で作った変数にあとから別の値を入れようとすると、どんなエラーが出るか確かめる。",
      "ブラウザで F12（開発者ツール）→ Console タブを開くと、その場で試せます。",
    ],
    playgroundExamples: [
      {
        label: "名前を表示",
        code: `const name = "しほ";

console.log(name);`,
      },
      {
        label: "constのエラー",
        code: `const siteName = "WEB BUILD LOG";

siteName = "NEW NAME";

console.log(siteName);`,
      },
    ],
    pitfalls: [
      {
        title: "const と let、どちらを使う？",
        body: "基本はすべて const。あとから値が変わるものだけ let にします。var は古い書き方なので、これから書くコードでは使いません。",
      },
      {
        title: "名前のつけ方にルールがある",
        body: "英数字で、数字はじめは不可。2語以上つなげるときは userName のように2語目から大文字にします（キャメルケース）。",
      },
    ],
    links: [
      {
        label: "MDN — 文法とデータ型",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Grammar_and_types",
      },
    ],
  },

  "js-array": {
    what: "複数の値を順番に並べて、ひとつの名前でまとめて持っておく入れ物です。[ ] の中にカンマ区切りで値を並べて作ります。",
    why: "「同じ形のデータが何個もある」ときに使います。実はこのサイトのロードマップ一覧も、カテゴリの配列をそのまま画面に並べて表示しています。項目を増やしたいときは配列に足すだけです。",
    code: {
      caption: "作る・取り出す・数える・足す",
      body: `const steps = ["変数", "配列", "IF", "FOR", "関数"];

console.log(steps[0]);     // → 変数（先頭は 1 ではなく 0 番）
console.log(steps.length); // → 5（入っている個数）

steps.push("オブジェクト"); // 末尾に1つ追加`,
    },
    practice: [
      "好きな色を3つ入れた配列 colors を作り、2番目（colors[1]）を表示してみる。",
      "colors.length を表示して、個数が数えられることを確かめる。",
      "存在しない番号（colors[10]）を表示すると何が返るか見てみる。",
    ],
    playgroundExamples: [
      {
        label: "色を取り出す",
        code: `const colors = ["red", "blue", "green"];

console.log(colors[1]);
console.log(colors.length);`,
      },
      {
        label: "ない番号",
        code: `const colors = ["red", "blue", "green"];

console.log(colors[10]);`,
      },
    ],
    pitfalls: [
      {
        title: "番号は 0 から始まる",
        body: "1番目は steps[0]、2番目は steps[1]。最後の要素は steps[steps.length - 1] になります。ここは最初に必ず一度つまずくところです。",
      },
      {
        title: "無い番号を指定しても、エラーにはならない",
        body: "undefined（値が無い状態）が返ってくるだけです。画面に「undefined」と出たら、まず配列の番号を疑ってみてください。",
      },
    ],
    links: [
      {
        label: "MDN — Array",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array",
      },
    ],
  },

  "js-if": {
    what: "条件によって、実行する処理を分けるための書き方です。「もし〜だったら、こうする。そうでなければ、こうする」をそのままコードにしたもの。",
    why: "画面の出し分けは、ほぼすべてこれで作られています。「ログインしていたら名前を出す」「チェック済みなら✓を出す」「0件なら『まだありません』と出す」——全部 IF です。",
    code: {
      caption: "if / else if / else",
      body: `const done = 3;
const total = 5;

if (done === total) {
  console.log("完了！");
} else if (done > 0) {
  console.log("進行中");
} else {
  console.log("これから");
}
// → 進行中`,
    },
    practice: [
      "score という変数を作り、80以上なら「合格」、それ未満なら「もう少し」と表示する。",
      "> < >= <= === !== を1つずつ試して、結果がどう変わるか確かめる。",
    ],
    playgroundExamples: [
      {
        label: "合格判定",
        code: `const score = 82;

if (score >= 80) {
  console.log("合格");
} else {
  console.log("もう少し");
}`,
      },
      {
        label: "比較を試す",
        code: `const current = 3;
const target = 5;

console.log(current < target);
console.log(current === target);`,
      },
    ],
    pitfalls: [
      {
        title: "= と === はまったく別物",
        body: "= は「入れる」、=== は「同じかどうか比べる」。if の中で = を書いてしまうのは、初心者がいちばんやる間違いです。",
      },
      {
        title: "== ではなく === を使う",
        body: '== は型を無視して比べるため、1 == "1" が true になってしまいます。予想外の動きを防ぐため、常に === を使います。',
      },
    ],
    links: [
      {
        label: "MDN — if...else",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/if...else",
      },
    ],
  },

  "js-for": {
    what: "同じ処理を、決めた回数だけ繰り返す書き方です。配列とセットで使うことがほとんどで、「中身を最初から最後まで1つずつ処理する」ために使います。",
    why: "項目が5個でも100個でも、書くコードは同じ数行で済みます。一覧表示・合計の計算・条件に合うものだけ抜き出す、といった処理はすべて繰り返しでできています。",
    code: {
      caption: "for と、よく使う forEach",
      body: `const steps = ["変数", "配列", "IF"];

for (let i = 0; i < steps.length; i++) {
  console.log(i + 1, steps[i]);
}
// → 1 変数 / 2 配列 / 3 IF

// 配列を回すだけなら、こちらの方がよく使われます
steps.forEach((step) => {
  console.log(step);
});`,
    },
    practice: [
      "for を使って 1 から 10 までを順番に表示する。",
      "前の項目で作った colors 配列を forEach で全部表示する。",
    ],
    playgroundExamples: [
      {
        label: "1から10",
        code: `for (let i = 1; i <= 10; i++) {
  console.log(i);
}`,
      },
      {
        label: "色を全部表示",
        code: `const colors = ["red", "blue", "green"];

colors.forEach((color) => {
  console.log(color);
});`,
      },
    ],
    pitfalls: [
      {
        title: "< を <= にすると1回多く回る",
        body: "i < steps.length が正解。<= にすると存在しない番号まで進んでしまい、最後に undefined が出ます。",
      },
      {
        title: "React では for より map",
        body: "画面に一覧を並べるときは、for ではなく配列の map を使います（React のカテゴリで扱います）。まずは「繰り返す」という考え方をここで押さえておけば大丈夫です。",
      },
    ],
    links: [
      {
        label: "MDN — for",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for",
      },
      {
        label: "MDN — Array.prototype.map()",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
      },
    ],
  },

  "js-function": {
    what: "いくつかの処理をひとまとめにして名前をつけ、必要なときに呼び出せるようにしたものです。材料（引数）を渡すと、結果（戻り値）を返してくれます。",
    why: "デザインのコンポーネント化とまったく同じ発想です。同じ処理を何度も書かず、1か所にまとめて使い回す。React のコンポーネントも、正体はこの関数です。",
    code: {
      caption: "定義して、呼び出す",
      body: `function progressText(done, total) {
  const percent = Math.round((done / total) * 100);
  return \`\${done} / \${total}（\${percent}%）\`;
}

console.log(progressText(3, 5)); // → 3 / 5（60%）
console.log(progressText(8, 8)); // → 8 / 8（100%）

// アロー関数（React でよく見かける短い書き方）
const double = (n) => n * 2;`,
    },
    practice: [
      "名前を受け取って「こんにちは、◯◯さん」と返す関数 greet を作る。",
      "上の progressText をそのまま書き写して、数字を変えて何度か呼び出してみる。",
      "return を消すとどうなるか確かめる（undefined が返ります）。",
    ],
    playgroundExamples: [
      {
        label: "greetを作る",
        code: `function greet(name) {
  return "こんにちは、" + name + "さん";
}

console.log(greet("しほ"));`,
      },
      {
        label: "returnなし",
        code: `function greet(name) {
  "こんにちは、" + name + "さん";
}

console.log(greet("しほ"));`,
      },
    ],
    pitfalls: [
      {
        title: "return を書き忘れると undefined",
        body: "関数の中で console.log しただけでは、値は返ってきません。呼び出し元で使いたい値は必ず return します。",
      },
      {
        title: "引数の順番は決まっている",
        body: "progressText(3, 5) と progressText(5, 3) では結果が変わります。定義した順に渡す必要があります。",
      },
    ],
    links: [
      {
        label: "MDN — 関数",
        url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Functions",
      },
    ],
  },

  "js-applied": {
    heading: "応用A：生徒一覧と合格判定",
    what: "ここまでの変数・配列・IF・FORをひとつに組み合わせて、実際に画面（DOM）を書き換える応用編です。DOM要素を作るところから1段階ずつ進み、最後は生徒一覧に合格ラベルをつけるところまで、自分の手でコードを書きながら確認します。",
    why: "変数・配列・IF・FORは、1つずつ覚えても「で、結局何に使うの？」となりがちです。実際の画面は、この4つが組み合わさってできています。一覧表示＋条件によるラベルの出し分けは、管理画面やダッシュボードで最もよく出てくる形のひとつなので、ここで一度、段階を踏んで組み立て方を体験します。",
  },
};

export default javascriptLessons;

// 応用A：生徒一覧と合格判定。
// 「DOM要素をつくる」→「配列を用意する」→「forで並べる」→「ifで合格判定」の
// 4段階に分けて、テンプレコードを少しずつ自分で書き換えながら確認するハンズオン。
// まだオブジェクトを習っていない前提のため、生徒データは studentNames / studentScores の
// 2つの配列（パラレル配列）で扱う。

const APPLIED_LESSON_A = {
  intro: {
    what: "ここまでの変数・配列・IF・FORをひとつに組み合わせて、実際に画面（DOM）を書き換える応用編です。DOM要素をつくるところから1段階ずつ進み、最後は生徒一覧に合格ラベルをつけるところまで、自分の手でコードを書き換えながら確認します。",
    why: "変数・配列・IF・FORは、1つずつ覚えても「で、結局何に使うの？」となりがちです。実際の画面は、この4つが組み合わさってできています。一覧表示＋条件によるラベルの出し分けは、管理画面やダッシュボードで最もよく出てくる形のひとつなので、ここで一度、段階を踏んで組み立て方を体験します。",
  },

  steps: [
    {
      id: "step1",
      label: "STEP 1",
      title: "DOM要素をひとつ作ってみる",
      kind: "dom",
      explanation:
        "document.getElementById(...) でHTML上の入れ物（<ul>）を取得し、document.createElement(\"li\") で新しい要素を作ります。作っただけではまだ画面には何も表示されず、list.appendChild(li) で追加して、はじめて実習エリアに反映されます。",
      html: `<ul id="student-list"></ul>`,
      htmlPreview: `<ul id="student-list">
  <li class="is-pass">田中：82点 → 合格</li>
  <li>佐藤：45点</li>
  <li class="is-pass">鈴木：60点 → 合格</li>
</ul>`,
      code: `const list = document.getElementById("student-list");

const li = document.createElement("li");
li.textContent = "田中：82点";
li.classList.add("is-pass");

list.appendChild(li);`,
      notes: [
        "li.textContent に入れた文字列が、そのままliの中の見た目のテキストになります。",
        "li.classList.add(\"is-pass\") をつけると、CSSの .is-pass スタイルが適用され、左の線の色や太さが変わります。",
        "list.appendChild(li) を実行するまでは、liを作っただけでは画面に何も表示されません。",
      ],
      practice: [
        "実行ボタンを押して、実際に1件だけ表示されることを確認する。",
        "li.textContent の文字列を書き換えて、もう一度実行してみる。",
        "li.classList.add(\"is-pass\") の行を消して再実行し、見た目がどう変わるか確認する。",
        "最後に li.classList.remove(\"is-pass\") を追記して、一度つけたクラスを外せることも確認する。",
      ],
    },
    {
      id: "step2",
      label: "STEP 2",
      title: "配列を2つ用意する",
      kind: "logic",
      explanation:
        "ここからは、生徒3人分のデータを配列で扱います。複数の値をひとまとめにする「オブジェクト」はまだ習っていないので、名前の配列と点数の配列を、同じ順番で対応させる形で2つ用意します。",
      code: `const studentNames = ["田中", "佐藤", "鈴木"];
const studentScores = [82, 45, 60];

console.log(studentNames[0], studentScores[0]);
console.log(studentNames[1], studentScores[1]);`,
      practice: [
        "studentNames[2] と studentScores[2] をconsole.logして、鈴木さんのデータが取り出せることを確認する。",
        "自分の名前と点数を、それぞれの配列の最後にpushしてみる。",
      ],
      pitfalls: [
        {
          title: "2つの配列は「同じ順番」で対応させる",
          body: "studentNames[i] と studentScores[i] は、同じ i なら同じ生徒を指す、という前提で成り立っています。片方の配列にだけpushすると対応がズレて、別人の点数を表示してしまいます。（本来はオブジェクトの配列 { name, score } でまとめる方が安全ですが、オブジェクトはまだ習っていないので、ここでは2つの配列で進めます。）",
        },
      ],
    },
    {
      id: "step3",
      label: "STEP 3",
      title: "forでDOMを配列の数だけ生成する",
      kind: "dom",
      explanation:
        "STEP1で1件だけ作った処理を、forで配列の数だけ繰り返します。studentNames.length の数だけループし、i番目の名前と点数を取り出してliに詰めていきます。",
      html: `<ul id="student-list"></ul>`,
      htmlPreview: `<ul id="student-list">
  <li>田中：82点</li>
  <li>佐藤：45点</li>
  <li>鈴木：60点</li>
</ul>`,
      code: `const studentNames = ["田中", "佐藤", "鈴木"];
const studentScores = [82, 45, 60];

const list = document.getElementById("student-list");

for (let i = 0; i < studentNames.length; i++) {
  const li = document.createElement("li");
  li.textContent = \`\${studentNames[i]}：\${studentScores[i]}点\`;
  list.appendChild(li);
}`,
      practice: [
        "studentNamesとstudentScoresに、自分のデータをもう1件ずつ追加して、4件表示されることを確認する。",
        "for文の条件を i < 2 に変えると、何件表示されるか確認する。",
      ],
    },
    {
      id: "step4",
      label: "STEP 4",
      title: "forの中にifを入れて合格ラベルを出す",
      kind: "dom",
      explanation:
        "forの中にif文を追加し、点数が60点以上かどうかで、表示するテキストとCSSクラス（is-pass）を出し分けます。STEP1で確認した「classListで見た目が変わる」しくみと、STEP3の「forで並べる」しくみを、ここでひとつにまとめます。",
      html: `<ul id="student-list"></ul>`,
      htmlPreview: `<ul id="student-list">
  <li class="is-pass">田中：82点 → 合格</li>
  <li>佐藤：45点</li>
  <li class="is-pass">鈴木：60点 → 合格</li>
</ul>`,
      code: `const studentNames = ["田中", "佐藤", "鈴木"];
const studentScores = [82, 45, 60];

const list = document.getElementById("student-list");

for (let i = 0; i < studentNames.length; i++) {
  const name = studentNames[i];
  const score = studentScores[i];
  const li = document.createElement("li");

  if (score >= 60) {
    li.textContent = \`\${name}：\${score}点 → 合格\`;
    li.classList.add("is-pass");
  } else {
    li.textContent = \`\${name}：\${score}点\`;
  }

  list.appendChild(li);
}`,
      practice: [
        "合格ラインを70点に変えて、一覧の表示がどう変わるか確認する。",
        "elseの中にも li.classList.add(\"is-fail\") を追加して、不合格の生徒だけ見た目を変えてみる。",
      ],
    },
  ],

  challenge: {
    title: "類題：出席回数から皆勤賞を表示する",
    description:
      "同じ考え方で、別のお題を自分で書いてみましょう。名前の配列 memberNames と、出席回数の配列 attendanceCounts があります。8回以上出席していたら「皆勤賞」というラベルをつけた一覧を作ってください。STEP4までのコードをそのまま参考にして構いません。",
    html: `<ul id="attendance-list"></ul>`,
    htmlPreview: `<ul id="attendance-list">
  <li class="is-pass">山田：9回 → 皆勤賞</li>
  <li>伊藤：5回</li>
  <li class="is-pass">小林：8回 → 皆勤賞</li>
</ul>`,
    code: `const memberNames = ["山田", "伊藤", "小林"];
const attendanceCounts = [9, 5, 8];

const list = document.getElementById("attendance-list");

// ここに for文 と if文 を書いて、
// 8回以上出席していたら「皆勤賞」ラベルをつけてみましょう`,
  },

  links: [
    {
      label: "MDN — Document.createElement()",
      url: "https://developer.mozilla.org/ja/docs/Web/API/Document/createElement",
    },
    {
      label: "MDN — Node.appendChild()",
      url: "https://developer.mozilla.org/ja/docs/Web/API/Node/appendChild",
    },
    {
      label: "MDN — Element.classList",
      url: "https://developer.mozilla.org/ja/docs/Web/API/Element/classList",
    },
  ],
};

export default APPLIED_LESSON_A;

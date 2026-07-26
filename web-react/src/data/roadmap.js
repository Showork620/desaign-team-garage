// Frontend エンジニアデビューへのロードマップ定義。
// ここは「一覧・進捗」のためのデータのみ。各項目の解説本文は data/lessons/ に置く。

export const ROADMAP = [
  {
    id: "github",
    num: "01",
    en: "GITHUB",
    title: "GitHub",
    desc: "コードを保存して、共有する",
    lead: "書いたコードを、記録して、渡す。",
    items: [
      { id: "gh-basic", title: "clone、commit、push、pull の基本操作" },
      { id: "gh-branch", title: "ブランチの作成と切り替え" },
      { id: "gh-pr", title: "プルリクエストの作成とレビューコメント" },
      { id: "gh-conflict", title: "コンフリクトの発生と解消" },
      { id: "gh-issue", title: "Issue の書き方・返信の仕方" },
    ],
  },
  {
    id: "javascript",
    num: "02",
    en: "JAVASCRIPT",
    title: "JavaScript",
    desc: "ページに動きをつける言葉を覚える",
    lead: "動きの正体は、たった5つの言葉。",
    items: [
      { id: "js-variable", title: "変数" },
      { id: "js-array", title: "配列" },
      { id: "js-if", title: "IF" },
      { id: "js-for", title: "FOR" },
      { id: "js-function", title: "関数" },
    ],
  },
  {
    id: "typescript",
    num: "03",
    en: "TYPESCRIPT",
    title: "TypeScript",
    desc: "データの種類を、あらかじめ約束する",
    lead: "壊れる前に、間違いに気づく。",
    items: [
      { id: "ts-basic-type", title: "基本型（string / number / boolean）" },
      { id: "ts-annotation", title: "型注釈と型推論の違い" },
      { id: "ts-array-object", title: "配列・オブジェクトの型定義" },
      { id: "ts-interface", title: "インターフェース（type との使い分けは軽く）" },
      { id: "ts-union", title: "ユニオン型とオプショナル" },
      { id: "ts-class", title: "クラス" },
    ],
  },
  {
    id: "css",
    num: "04",
    en: "ADVANCED CSS",
    title: "上級CSS",
    desc: "レイアウトを、設計として組む",
    lead: "見た目ではなく、構造をつくる。",
    items: [
      { id: "css-flex", title: "Flexbox でリスト・ナビゲーション" },
      { id: "css-grid", title: "Grid でカードレイアウト" },
      { id: "css-cascade", title: "詳細度とカスケードの理解" },
      { id: "css-naming", title: "クラス命名規則（BEMなど）で構造設計" },
      { id: "css-responsive", title: "メディアクエリとレスポンシブ" },
      { id: "css-variable", title: "カスタムプロパティ（変数）" },
      { id: "css-pseudo", title: "擬似クラス・擬似要素、トランジション" },
    ],
  },
  {
    id: "api",
    num: "05",
    en: "API",
    title: "API",
    desc: "外からデータを受け取って表示する",
    lead: "画面の向こうから、データが届く。",
    items: [
      { id: "api-http", title: "HTTPの基礎（GET / POST、ステータスコード）" },
      { id: "api-json", title: "JSONの構造を読める・書ける" },
      { id: "api-fetch", title: "fetch でデータ取得" },
      { id: "api-dom", title: "取得したデータをDOMに反映" },
      { id: "api-devtools", title: "DevTools の Network タブでリクエストを確認" },
      { id: "api-backend", title: "Backendとの連携" },
    ],
  },
  {
    id: "async",
    num: "06",
    en: "ADVANCED JAVASCRIPT",
    title: "上級JavaScript",
    desc: "待つ処理と、失敗の扱い方",
    lead: "すぐには返ってこない、を扱う。",
    items: [
      { id: "async-await", title: "非同期処理（async/await）" },
      { id: "async-promise", title: "Promise の基本" },
      { id: "async-error", title: "エラーハンドリング（try/catch、通信失敗・404などの扱い）" },
    ],
  },
  {
    id: "aws",
    num: "07",
    en: "AWS",
    title: "AWS",
    desc: "アプリが動いている場所を知る",
    lead: "つくったものは、どこで動く？",
    items: [
      { id: "aws-ec2", title: "EC2とは何か" },
      { id: "aws-ha", title: "可用性と負荷分散の違い" },
      { id: "aws-dr", title: "4つのDC戦略" },
      { id: "aws-storage", title: "S3とDynamoDBとRDS" },
    ],
  },
  {
    id: "react",
    num: "08",
    en: "REACT",
    title: "React",
    desc: "学んだ全部を、アプリの形にする",
    lead: "部品を組んで、動くものにする。",
    items: [
      { id: "react-jsx", title: "コンポーネントとJSX" },
      { id: "react-props", title: "props でデータを渡す" },
      { id: "react-state", title: "useState で状態管理" },
      { id: "react-event", title: "イベントハンドリング" },
      { id: "react-render", title: "条件付きレンダリングとリスト表示（map + key）" },
      { id: "react-effect", title: "useEffect でAPIからデータ取得" },
      { id: "react-split", title: "コンポーネント分割の考え方" },
      { id: "react-maintain", title: "既存コードの読み方・修正の入れ方（メンテナンス目線）" },
      { id: "react-app", title: "TypeScript・API・上級CSSの知識を活かしてReactアプリをメンテナンス" },
    ],
  },
];

export const ALL_ITEM_IDS = ROADMAP.flatMap((category) =>
  category.items.map((item) => item.id),
);

export function findCategory(categoryId) {
  return ROADMAP.find((category) => category.id === categoryId) ?? null;
}

export function findCategoryIndex(categoryId) {
  return ROADMAP.findIndex((category) => category.id === categoryId);
}

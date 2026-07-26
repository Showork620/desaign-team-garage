# Frontend エンジニアデビュー ロードマップ — 実装計画

作成日: 2026-07-26
対象: `web-react/`（React 19 + Vite 8）

## 実装状況（2026-07-26 時点）

- ✅ Phase 0〜2：ルーティング / データ定義 / 進捗管理 / ロードマップトップ
- ✅ Phase 3：特設ページの型 + **JavaScript カテゴリの本文（5項目）**
- ⬜ Phase 4：残り7カテゴリの本文（GitHub / TypeScript / 上級CSS / API / 上級JavaScript / AWS / React）
- ⬜ Phase 5：仕上げ（進捗リセットは実装済み。README 追記済み）

※ 7章の確認事項は「既存6項目は新8カテゴリで置き換える」で決定済み。AWS の順番は当初のリスト通り 07。

---

## 1. やりたいこと（ゴール）

現在の `Roadmap` セクション「**わからないを、ひとつずつ進む。**」を、
飾りのリスト（HTML / CSS / JS / AI Tools / GitHub / App Build の6行）から
**実際に進捗を管理できる学習ロードマップ**に育てる。

| | 内容 |
|---|---|
| ① ロードマップトップ | 8カテゴリ・全45項目をチェックボックスで管理。全体進捗と各カテゴリ進捗をバーで表示 |
| ② 特設ページ | カテゴリごとに1ページ。各項目の「これは何？」「なぜ必要？」「やってみる」を書き溜めていく |
| ③ 進捗の保存 | ブラウザの localStorage に保存。リロードしてもチェックが残る |

---

## 2. 現状の把握

```
web-react/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx          … createRoot して <App /> を描画
    ├── App.jsx           … Header + 6セクション + Footer を並べるだけ
    ├── index.css         … 全スタイル（1ファイル・圧縮気味の記法）
    ├── useReveal.js      … スクロールで .is-visible を付ける自作フック
    └── components/
        ├── Header.jsx  Hero.jsx  About.jsx
        ├── Roadmap.jsx       ← ここを大改修する
        ├── Works.jsx  ProcessLog.jsx  AiSection.jsx
        └── FinalGoal.jsx  Footer.jsx
```

- **1ページのみ**の構成。ルーティングは未導入（`#about` などのアンカーリンクだけ）。
- 状態管理・保存の仕組みは無し（`useState` すら未使用）。
- デザイントークンは `index.css` の `:root` に集約済み
  （`--bg:#080808` / `--accent:#c8ff32` / `--sans` / `--latin`）。
- Roadmap セクションだけ **背景が明るい**（`#ecece5` / 文字 `#0a0a0a`）。特設ページもこの明るい面を引き継ぐと世界観が繋がる。

---

## 3. 全体設計

### 3-1. ルーティング（複数ページ化）

**採用案: `react-router-dom` の `HashRouter`**

```
/#/              → トップページ（今のまま。Roadmap セクションを改修）
/#/roadmap/github     → 特設ページ 01 GitHub
/#/roadmap/javascript → 特設ページ 02 JavaScript
   … 以下 8カテゴリ分
```

- **なぜ HashRouter か**: URL に `#` が入る代わりに、サーバー設定が一切不要。
  GitHub Pages などの静的ホスティングに置いても、直リンクで404にならない。
- **なぜ自作せず react-router か**: 実務で最も使われている標準ライブラリで、
  学習の題材としてそのまま価値がある（依存は1つだけ増える）。

> 既存の `#about` `#roadmap` などのアンカーは、HashRouter と衝突するため
> `/#/` 内のスクロール制御に置き換える（Header のリンクを route 対応にする）。

### 3-2. データの持ち方

**`src/data/roadmap.js` に全ロードマップ定義を集約する**（1ファイル・純粋なデータ）。

```js
export const ROADMAP = [
  {
    id: "github",              // URL とストレージのキー
    num: "01",
    en: "GITHUB",
    title: "GitHub",
    lead: "コードを保存して、チームで共有する",
    items: [
      { id: "github-basic",  title: "clone、commit、push、pull の基本操作" },
      { id: "github-branch", title: "ブランチの作成と切り替え" },
      // …
    ],
  },
  // …8カテゴリ
];
```

- 各項目の**解説本文は別ファイル**（`src/data/lessons/github.jsx` など）に分け、
  データ（一覧・進捗用）と原稿（読み物）を混ぜない。
- 「書いていく予定」の運用に合わせ、本文が未執筆でも一覧とチェックは動く設計にする
  （本文が無い項目は「準備中」と表示）。

### 3-3. カテゴリと項目数

| No | カテゴリ | id | 項目数 |
|---|---|---|---|
| 01 | GitHub | `github` | 5 |
| 02 | JavaScript | `javascript` | 5 |
| 03 | TypeScript | `typescript` | 6 |
| 04 | 上級CSS | `css` | 7 |
| 05 | API | `api` | 6 |
| 06 | 上級JavaScript | `async` | 3 |
| 07 | AWS | `aws` | 4 |
| 08 | React | `react` | 9 |
| | **合計** | | **45** |

### 3-4. 進捗の管理

- `src/progress/ProgressContext.jsx` … React Context + `useState`
- 保存先: `localStorage` キー `dtg:roadmap:v1`
  形式は `{ "github-basic": true, "js-variable": true }` のようなフラットなオブジェクト
- 提供する値: `isDone(itemId)` / `toggle(itemId)` / `categoryProgress(catId)` / `totalProgress()` / `resetAll()`
- `<App>` の外側で Provider を張り、**トップページと特設ページでチェックが同期**するようにする
- 注意: localStorage はブラウザごと。端末を変えると進捗は引き継がれない（この段階では許容）

---

## 4. 画面設計

### 4-1. ロードマップトップ（`Roadmap.jsx` 改修）

```
┌──────────────────────────────────────────┐
│ 02 / LEARNING ROADMAP                    │
│                                          │
│ わからないを、                             │
│ ひとつずつ進む。                           │
│                                          │
│ ████████░░░░░░░░░░░░  12 / 45  (27%)     │ ← 全体進捗バー
│                                          │
│ ─────────────────────────────────────    │
│ 01  GitHub          ▓▓▓░░ 3/5      →    │ ← 行クリックで特設ページへ
│      □ clone、commit、push、pull          │ ← チェックボックスはその場で ON/OFF
│      ☑ ブランチの作成と切り替え             │
│      …                                   │
│ ─────────────────────────────────────    │
│ 02  JavaScript      ░░░░░ 0/5      →    │
└──────────────────────────────────────────┘
```

- 既存の `.roadmap-list article`（グリッド4列・hover でアクセント色）のデザインを踏襲
- カテゴリ行は**アコーディオン**で開閉。閉じている状態では今のミニマルな見た目のまま
- チェックボックスのクリックがページ遷移を誘発しないようイベントを分離
- 完了カテゴリには✓バッジ

### 4-2. 特設ページ（カテゴリ詳細）

```
┌──────────────────────────────────────────┐
│ ← BACK TO ROADMAP                        │
│ 01 / GITHUB                              │
│ コードを保存して、                          │
│ チームで共有する。                          │  ← display-title を流用
│ ▓▓▓░░ 3 / 5 完了                          │
├──────────────────────────────────────────┤
│ ☑ 01  clone、commit、push、pull の基本操作 │
│      ├ これは何？                          │
│      ├ なぜ必要？                          │
│      ├ やってみる（ミニ課題）                │
│      ├ つまずきポイント                     │
│      └ 参考リンク                          │
├──────────────────────────────────────────┤
│ NEXT → 02 JavaScript                     │
└──────────────────────────────────────────┘
```

- 各項目の構成を**5ブロックに固定**（これは何？ / なぜ必要？ / やってみる / つまずき / 参考リンク）。
  型が決まっていると、あとから書き足すのが楽になる。
- 明るい面（`#ecece5`）を基調にし、ロードマップセクションと世界観を繋げる
- 前後カテゴリへのナビゲーションを下部に置く

---

## 5. ファイル構成（完成イメージ）

```
web-react/src/
├── main.jsx                     … Router と ProgressProvider を追加
├── App.jsx                      … Routes 定義に変更
├── index.css
├── styles/
│   └── roadmap.css              ★ 新規。ロードマップ／特設ページ用スタイル
├── data/
│   ├── roadmap.js               ★ 8カテゴリ・45項目の定義
│   └── lessons/
│       ├── github.jsx           ★ 各項目の解説原稿
│       ├── javascript.jsx       ★
│       └── …（8ファイル）
├── progress/
│   └── ProgressContext.jsx      ★ 進捗の保存・読み出し
├── pages/
│   ├── HomePage.jsx             ★ 今の App.jsx の中身を移動
│   └── CategoryPage.jsx         ★ 特設ページ（全カテゴリ共通テンプレート）
└── components/
    ├── Roadmap.jsx              ◎ 大改修
    ├── ProgressBar.jsx          ★ 進捗バー（トップ・詳細で共用）
    ├── CheckItem.jsx            ★ チェックボックス1行
    └── （その他は変更なし）
```

★ = 新規 / ◎ = 大きく修正

---

## 6. 実装フェーズ

### Phase 0 — 土台づくり
1. `npm i react-router-dom`
2. `main.jsx` に `HashRouter` と `ProgressProvider` を追加
3. 今の `App.jsx` の中身を `pages/HomePage.jsx` に移し、`App.jsx` は `Routes` だけにする
4. `Header` のリンクをルート対応にする（詳細ページからでもトップの該当位置へ飛べる）
5. **動作確認**: 今まで通りトップが表示される／URLに `#/` が付く

### Phase 1 — データ定義
1. `data/roadmap.js` に 8カテゴリ・45項目を全部書く（タイトルのみ。本文はまだ）
2. `progress/ProgressContext.jsx` を実装（localStorage 読み書き＋集計）

### Phase 2 — ロードマップトップの改修
1. `ProgressBar.jsx` / `CheckItem.jsx` を作る
2. `Roadmap.jsx` をデータ駆動に差し替え（アコーディオン＋チェック＋進捗＋詳細リンク）
3. `styles/roadmap.css` にスタイル追加
4. **動作確認**: チェック → リロード → 状態が残る

### Phase 3 — 特設ページの「型」を1本作る
1. `pages/CategoryPage.jsx` を実装（URLパラメータからカテゴリを引く／404対応）
2. `data/lessons/github.jsx` に **GitHub の5項目を最後まで執筆**
3. デザイン・文章の粒度をここで確定させる
4. **レビュー**: この1ページを見て、以降7カテゴリの型として良いか判断する

### Phase 4 — 残り7カテゴリの執筆
JavaScript → TypeScript → 上級CSS → API → 上級JavaScript → AWS → React の順に
`data/lessons/*.jsx` を埋めていく。**1カテゴリ = 1コミット**で進める。

### Phase 5 — 仕上げ
1. スマホ幅（`max-width:800px`）の表示調整
2. 進捗リセットボタン
3. `npm run lint` / `npm run build` を通す
4. `README.md` にロードマップ機能の説明を追記

---

## 7. 決めておきたいこと（要確認）

1. **既存の6項目（HTML / CSS / JavaScript / AI Tools / GitHub / App Build）をどうするか**
   - 案A: 新ロードマップ8カテゴリで**置き換える**（推奨・シンプル）
   - 案B: 「STEP 0 基礎編」として残し、その下に新8カテゴリを続ける
2. **本文の執筆量** … 1項目あたり 300〜500字程度を想定（画面設計の5ブロック）でよいか
3. **AWS の扱い** … フロントエンドのロードマップとしては応用寄り。順番は最後（React の後）でもよいか
4. **進捗の共有** … 今回は localStorage のみ（端末をまたがない）。将来 GitHub に保存したくなったら別途検討

---

## 8. リスク・注意点

| 項目 | 内容 | 対応 |
|---|---|---|
| ルーティング導入 | 既存のアンカーリンク（`#about` 等）が壊れる可能性 | Phase 0 で必ず動作確認する |
| useReveal | 詳細ページの要素にはアニメーションが効かない（DOM検索が初回のみ） | 詳細ページ側でも同じフックを呼ぶ／セレクタを追加 |
| index.css の肥大化 | 1ファイルに全部入っており編集しづらい | 新規分は `styles/roadmap.css` に分離 |
| 執筆量 | 45項目 × 5ブロックは相応のボリューム | Phase 4 でカテゴリ単位に分割して進める |

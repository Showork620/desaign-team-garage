// GitHub カテゴリの解説本文。
// Git は変更履歴を記録する道具、GitHub はその履歴をチームで共有する場所。

const githubLessons = {
  "gh-basic": {
    heading: "Git と GitHub、clone / commit / push / pull",
    what:
      "Git はファイルの変更履歴を記録する道具です。GitHub は、その記録をオンラインに置いて、チームで見たり渡したりする場所です。clone は手元にコピー、commit は変更の記録、push はGitHubへ送る、pull はGitHubから受け取る操作です。",
    why:
      "デザインファイルのバージョンを残すように、コードも「いつ、誰が、何を変えたか」を残します。失敗しても戻れるし、ほかの人と同じコードを見ながら作業できます。",
    code: {
      caption: "よく使う基本の流れ",
      body: `git clone https://github.com/example/project.git

git status
git add .
git commit -m "トップページの文言を修正"
git push

git pull`,
    },
    practice: [
      "作業前に git pull をして、GitHub側の最新状態を受け取る。",
      "ファイルを1つ変更して git status で差分があることを確認する。",
      "commit メッセージは「何をしたか」がわかる短い文にする。",
    ],
    pitfalls: [
      {
        title: "Git と GitHub は同じものではない",
        body: "Git は手元でも動く履歴管理の仕組み。GitHub はその履歴を置くオンラインサービスです。まずここを分けて考えると混乱が減ります。",
      },
      {
        title: "commit だけではGitHubに反映されない",
        body: "commit は手元の記録、push はGitHubへ送る操作です。GitHub上に出したいときは push まで必要です。",
      },
    ],
    links: [
      {
        label: "GitHub Docs — Gitを使う",
        url: "https://docs.github.com/ja/get-started/using-git",
      },
    ],
  },

  "gh-branch": {
    heading: "ブランチの作成と切り替え",
    what:
      "ブランチは、同じコードから分かれた作業用の道です。main を直接触らず、新しい機能や修正ごとに別のブランチを作って作業します。",
    why:
      "作業途中のコードを本番用の道に混ぜずに済みます。試行錯誤しても main はきれいなままなので、チーム開発ではほぼ必ず使います。",
    code: {
      caption: "ブランチを作って移動する",
      body: `git branch

git switch -c feature/header-update

git status
git push -u origin feature/header-update`,
    },
    practice: [
      "今いるブランチを git branch で確認する。",
      "作業内容がわかる名前で新しいブランチを作る。",
      "ブランチ名は feature/header-update のように、目的が読める形にする。",
    ],
    pitfalls: [
      {
        title: "今どのブランチにいるかを確認する",
        body: "違うブランチで作業すると、変更が見つからなくなったように感じます。作業前と保存前に git status を見る癖をつけると安心です。",
      },
      {
        title: "main で直接作業しない",
        body: "学習中でも、変更用ブランチを作る流れに慣れておくと、実務のレビューやPRが怖くなくなります。",
      },
    ],
    links: [
      {
        label: "GitHub Docs — ブランチについて",
        url: "https://docs.github.com/ja/get-started/quickstart/github-flow",
      },
    ],
  },

  "gh-pr": {
    heading: "プルリクエストの作成とレビューコメント",
    what:
      "プルリクエスト、略してPRは「この変更をmainに入れてよいか見てください」という依頼です。変更内容、意図、確認したことをまとめて、レビューしてもらいます。",
    why:
      "コードは動くだけでなく、読みやすさ・影響範囲・デザインとのズレも確認が必要です。PRに説明を書くことで、見る人が短時間で判断できます。",
    code: {
      caption: "PRに書く内容の例",
      body: `## やったこと
- ヘッダーの文言を変更
- モバイル時の余白を調整

## 確認したこと
- トップページを表示して崩れがないこと
- スマホ幅でもボタンが折り返さないこと`,
    },
    practice: [
      "PRの本文に「やったこと」と「確認したこと」を分けて書く。",
      "レビューコメントをもらったら、まず意図を読み、必要なら質問してから直す。",
      "直したあとにコメントへ返信して、対応済みであることを伝える。",
    ],
    pitfalls: [
      {
        title: "PRは完璧発表会ではない",
        body: "途中で相談するためにも使えます。迷っている点があれば本文に書くと、レビューが会話になります。",
      },
      {
        title: "スクリーンショットがあると伝わりやすい",
        body: "見た目の変更は、Before / After の画像があるだけでレビューしやすくなります。デザイナーの強みが出る場所です。",
      },
    ],
    links: [
      {
        label: "GitHub Docs — pull requestについて",
        url: "https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
      },
    ],
  },

  "gh-conflict": {
    heading: "コンフリクトの発生と解消",
    what:
      "コンフリクトは、同じ場所を複数人が別々に変更して、Gitがどちらを採用すればよいか判断できない状態です。壊れたというより、確認が必要な合図です。",
    why:
      "チームで同じファイルを触ると必ず起こりえます。意味を知っていれば怖いエラーではなく、「どちらの変更を残すか決める作業」になります。",
    code: {
      caption: "コンフリクト部分の見え方",
      body: `<<<<<<< HEAD
現在のブランチの内容
=======
取り込もうとしている内容
>>>>>>> main`,
    },
    practice: [
      "<<<<<<<、=======、>>>>>>> の印を探して、どちらの内容を残すか決める。",
      "必要なら両方の内容を手で組み合わせる。",
      "印を消して保存し、もう一度動作確認する。",
    ],
    pitfalls: [
      {
        title: "印を残したままにしない",
        body: "<<<<<<< などの印はGitが入れた確認用の文字です。解消後は必ず消します。",
      },
      {
        title: "迷ったら変更した人に聞く",
        body: "コンフリクト解消は正解探しではなく、意図のすり合わせです。相手の変更理由を確認すると安全に進められます。",
      },
    ],
    links: [
      {
        label: "GitHub Docs — マージコンフリクトを解決する",
        url: "https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts",
      },
    ],
  },

  "gh-issue": {
    heading: "Issue の書き方・返信の仕方",
    what:
      "Issue は、バグ・改善案・相談ごとをチームで管理するためのメモです。何が起きているか、期待する状態、再現方法、参考画像などを書きます。",
    why:
      "口頭だけだと忘れたり、認識がずれたりします。Issueに残すと、あとから見返せて、誰が何をすればよいかがはっきりします。",
    code: {
      caption: "Issueに書く内容の例",
      body: `## 起きていること
スマホ幅でCTAボタンの文字が2行になっている

## 期待する状態
1行で収まり、左右の余白も保たれている

## 確認環境
- iPhone幅
- Safari`,
    },
    practice: [
      "見た目の問題はスクリーンショットを添える。",
      "「起きていること」と「期待する状態」を分けて書く。",
      "返信するときは、対応内容・確認結果・残っている不明点を短く書く。",
    ],
    pitfalls: [
      {
        title: "タイトルだけで終わらせない",
        body: "「ボタンが変」だけだと調査に時間がかかります。どの画面で、どう変なのかを書くと、相手がすぐ動けます。",
      },
      {
        title: "責める文章にしない",
        body: "Issueは人を指摘する場所ではなく、状態を共有する場所です。事実と期待値を落ち着いて書けば十分です。",
      },
    ],
    links: [
      {
        label: "GitHub Docs — Issueについて",
        url: "https://docs.github.com/ja/issues/tracking-your-work-with-issues/about-issues",
      },
    ],
  },
};

export default githubLessons;

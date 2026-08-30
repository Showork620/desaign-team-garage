// カテゴリID → 解説本文 の対応表。
// 新しいカテゴリを書き終えたら、ここに1行足すだけで特設ページに反映される。

import javascript from "./javascript";
import github from "./github";

const LESSONS = {
  github,
  javascript,
};

export function getLessons(categoryId) {
  return LESSONS[categoryId] ?? null;
}

export function getLesson(categoryId, itemId) {
  return LESSONS[categoryId]?.[itemId] ?? null;
}

export default LESSONS;

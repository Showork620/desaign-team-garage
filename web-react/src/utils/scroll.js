// トップページ内の指定セクションまでスクロールする。
// behavior: "smooth"（同じページ内での移動）/ "instant"（別ページから戻ってきたとき）
export function scrollToSection(section, behavior = "smooth") {
  if (!section || section === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const target = document.getElementById(section);
  if (!target) return;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior });
}

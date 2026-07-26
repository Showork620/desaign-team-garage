import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../utils/scroll";

// トップページ内のセクションへ飛ぶリンク。
// 特設ページなど別ページにいるときは、いったんトップへ戻ってからスクロールする。
export default function SectionLink({ section, className, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (event) => {
    event.preventDefault();
    if (pathname !== "/") {
      navigate("/", { state: { scrollTo: section } });
      return;
    }
    scrollToSection(section);
  };

  return (
    <a href="#/" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

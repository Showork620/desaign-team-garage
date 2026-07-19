import { useEffect } from "react";

const REVEAL_SELECTOR =
  ".section-head, .display-title, .roadmap-list article, .work-card, .log-list article, .ai-grid div";

export default function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    targets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

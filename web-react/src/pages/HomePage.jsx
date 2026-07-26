import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Roadmap from "../components/Roadmap";
import Works from "../components/Works";
import ProcessLog from "../components/ProcessLog";
import AiSection from "../components/AiSection";
import FinalGoal from "../components/FinalGoal";
import { scrollToSection } from "../utils/scroll";
import useReveal from "../useReveal";

export default function HomePage() {
  const { state } = useLocation();
  useReveal();

  // 特設ページから戻ってきたときは、元のセクションまでスクロールする。
  // 描画が終わってから位置を測りたいので1フレーム待つ。
  useEffect(() => {
    if (!state?.scrollTo) return;
    const frame = requestAnimationFrame(() => scrollToSection(state.scrollTo, "instant"));
    return () => cancelAnimationFrame(frame);
  }, [state]);

  return (
    <main id="top">
      <Hero />
      <About />
      <Roadmap />
      <Works />
      <ProcessLog />
      <AiSection />
      <FinalGoal />
    </main>
  );
}

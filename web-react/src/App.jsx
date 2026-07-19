import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Roadmap from "./components/Roadmap";
import Works from "./components/Works";
import ProcessLog from "./components/ProcessLog";
import AiSection from "./components/AiSection";
import FinalGoal from "./components/FinalGoal";
import Footer from "./components/Footer";
import useReveal from "./useReveal";

export default function App() {
  useReveal();

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Roadmap />
        <Works />
        <ProcessLog />
        <AiSection />
        <FinalGoal />
      </main>
      <Footer />
    </>
  );
}

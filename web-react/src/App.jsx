import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap/:categoryId" element={<CategoryPage />} />
        <Route path="*" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

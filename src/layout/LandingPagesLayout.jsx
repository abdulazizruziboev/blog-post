import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function LandingPageLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[90vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

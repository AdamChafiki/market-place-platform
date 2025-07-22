import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto container">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

export default BaseLayout;

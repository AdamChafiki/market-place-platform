import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

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

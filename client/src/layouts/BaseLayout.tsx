import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "sonner";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto container">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Toaster position="bottom-right" richColors />
      <Footer />
    </div>
  );
}

export default BaseLayout;

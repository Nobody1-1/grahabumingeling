import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialBar from "@/components/SocialBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SocialBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}


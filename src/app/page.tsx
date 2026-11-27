import { FloatingMobileCta } from "@/components/FloatingMobileCta";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { MenuSection } from "@/components/MenuSection";
import { Navbar } from "@/components/Navbar";
import { NorenLoader } from "@/components/NorenLoader";
import { SignatureBowlsSection } from "@/components/SignatureBowlsSection";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { SpaceGallerySection } from "@/components/SpaceGallerySection";
import { StorySection } from "@/components/StorySection";
import { VisitSection } from "@/components/VisitSection";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <NorenLoader />
      <Navbar />

      <main>
        <HeroSection />
        <StorySection />
        <SignatureBowlsSection />
        <MenuSection />
        <SpaceGallerySection />
        <VisitSection />
      </main>

      <Footer />
      <FloatingMobileCta />
    </SmoothScrollProvider>
  );
}

import { Navigation } from "../../components/layout/Navigation";
import { Footer } from "../../components/layout/Footer";
import { EexploHeroSection } from "./sections/EexploHeroSection";
import { ClientLogoSection } from "./sections/ClientLogoSection";
import { FeaturesStatsSection } from "./sections/FeaturesStatsSection";
import { EexploDestinationsSection } from "./sections/EexploDestinationsSection";
import { EexploTourPackagesSection } from "./sections/EexploTourPackagesSection";
import { EexploServicesSection } from "./sections/EexploServicesSection";
import { SocialGallerySection } from "./sections/SocialGallerySection";
import { VideoTestimonialSection } from "./sections/VideoTestimonialSection";
import { CompanyStorySection } from "./sections/CompanyStorySection";
import { EexploBlogSection } from "./sections/EexploBlogSection";
import { EexploFAQSection } from "./sections/EexploFAQSection";
import { EexploContactSection } from "./sections/EexploContactSection";

export const Home = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Navigation />
      <EexploHeroSection />
      <ClientLogoSection />
      <FeaturesStatsSection />
      <EexploDestinationsSection />
      <EexploTourPackagesSection />
      <EexploServicesSection />
      <SocialGallerySection />
      <VideoTestimonialSection />
      <CompanyStorySection />
      <EexploBlogSection />
      <EexploFAQSection />
      <EexploContactSection />
      <Footer />
    </main>
  );
};

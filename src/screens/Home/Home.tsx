import { Navigation } from "../../components/layout/Navigation";
import { NewHeroSection } from "./sections/NewHeroSection";
import { PopularHotelsSection } from "./sections/PopularHotelsSection";
import { MemoriesSection } from "./sections/MemoriesSection";
import { HotNewsSection } from "./sections/HotNewsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { NewsletterSection } from "./sections/NewsletterSection";

export const Home = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Navigation />
      <NewHeroSection />
      <PopularHotelsSection />
      <MemoriesSection />
      <HotNewsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
};

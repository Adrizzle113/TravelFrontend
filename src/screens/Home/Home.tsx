
import { Navigation } from "../../components/layout/Navigation";
import { Header } from "../../components/layout/Header";
import { StatisticsSection } from "./sections/StatisticsSection/StatisticsSection";
import { AboutUsSection } from "./sections/AboutUsSection/AboutUsSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { ServicesSection } from "./sections/ServicesSection";
import { BenefitsSection } from "./sections/BenefitsSection/BenefitsSection";
import { PortfolioSection } from "./sections/PortfolioSection/PortfolioSection";
import { ReviewsSection } from "./sections/ReviewsSection/ReviewsSection";
import { ActionSection } from "./sections/ActionSection";
import { ArticlesSection } from "./sections/ArticlesSection/ArticlesSection";

export const Home = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Navigation />
      <Header />
      <StatisticsSection />
      <AboutUsSection />
      <IntroductionSection />
      <ServicesSection />
      <BenefitsSection />
      <PortfolioSection />
      <ReviewsSection />
      <ActionSection />
      <ArticlesSection />
    </main>
  );
};

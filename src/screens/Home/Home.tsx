import { Navigation } from "../../components/layout/Navigation";

export const Home = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full overflow-x-hidden bg-brand-off-white">
      <Navigation />
      <section
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/HeroHotel.jpg')" }}
      >
        <div className="absolute inset-0 bg-brand-ultra-dark/50" />
      </section>
    </main>
  );
};

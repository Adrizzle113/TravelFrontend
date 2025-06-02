
import { SearchBar } from "./components/SearchBar";
import { HotelListSection } from "./sections/HotelListSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection";
import { CallToActionSection } from "./sections/CallToActionSection";
export const Search = (): JSX.Element => {
  return <main className="flex flex-col w-full">
      <section style={{
      backgroundImage: "linear-gradient(90deg, rgba(52,78,65,0.95) 32%, rgba(0,0,0,0.13) 100%), url('/images/Header.png')"
    }} className="relative h-[50vh] bg-cover bg-center flex items-center pt-0 rounded-3xl pb-20">
        <div className="container md:px-[100px] w-full px-[25px] mx-0 py-[5px] my-[70px]">
          <div className="max-w-2xl mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading-very-big text-[#f3ecdc] mb-3 leading-tight whitespace-nowrap">
              Find the Perfect Hotel for Your Clients
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#ffffffbf] mb-8">
              Access exclusive rates and amenities for your valued customers
            </p>
          </div>
          <SearchBar />
        </div>
      </section>
      <div className="pt-20 py-[100px]">
        <HotelListSection />
        <WhyChooseUsSection />
        <CallToActionSection />
      </div>
    </main>;
};

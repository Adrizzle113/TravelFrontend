
import { ListSearchBar } from "./components/ListSearchBar";
import { HotelListSection } from "./sections/HotelListSection/HotelListSection";

export const List = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <ListSearchBar />
      <HotelListSection />
    </main>
  );
};

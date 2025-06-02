import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export const ImageGallerySection = (): JSX.Element => {
  // Navigation tab items data
  const navigationItems = [
    { id: "list", label: "List Apartemen", active: true },
    { id: "availability", label: "Ketersediaan dan tarif" },
    { id: "facilities", label: "Fasilitas" },
    { id: "neighbors", label: "Para tetangga" },
    { id: "policy", label: "Kebijakan pemesanan" },
  ];

  return (
    <div className="w-full flex flex-col items-start bg-[#f3ecdc] border-b border-[#b1b1b1] px-6 py-2.5 lg:px-[102px]">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="bg-transparent h-auto p-0 justify-start">
          {navigationItems.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className={`rounded-none px-2.5 py-2.5 data-[state=active]:border-b-[3px] data-[state=active]:border-[#e6b022] data-[state=active]:shadow-none data-[state=active]:bg-transparent h-auto`}
            >
              <span className="font-normal text-[17.2px] text-black leading-[27.9px] font-['Inter',Helvetica]">
                {item.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

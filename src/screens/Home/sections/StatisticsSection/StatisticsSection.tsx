import { Card, CardContent } from "../../../../components/ui/card";

export const StatisticsSection = (): JSX.Element => {
  // Data for statistics to enable mapping
  const statistics = [
    { number: "386", label: "Apartemen Terbaik" },
    { number: "56", label: "Partner Kami" },
    { number: "78K", label: "Customer suka" },
    { number: "15 th", label: "Pengalaman Terbaik" },
  ];

  return (
    <section className="flex w-full items-start gap-[30px] px-4 md:px-8 lg:px-[100px] py-[50px] bg-app-accent overflow-hidden">
      <div className="hidden lg:grid lg:grid-cols-4 gap-8 w-full">
        {statistics.map((stat, index) => (
          <Card
            key={index}
            className="flex-1 bg-transparent border-none shadow-none"
          >
            <CardContent className="flex flex-col items-center gap-5 p-0">
              <div className="inline-flex items-start justify-center gap-2.5">
                <div className="text-[#f3ecdc] font-heading-big font-[number:var(--heading-big-font-weight)] text-[length:var(--heading-big-font-size)] tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)] [font-style:var(--heading-big-font-style)]">
                  {stat.number}
                </div>
                <div className="font-body text-[#ffffffbf] text-[length:var(--body-font-size)] leading-[var(--body-line-height)] whitespace-nowrap font-[number:var(--body-font-weight)] tracking-[var(--body-letter-spacing)] [font-style:var(--body-font-style)]">
                  +
                </div>
              </div>
              <div className="w-full font-heading-small font-[number:var(--heading-small-font-weight)] text-[#f3ecdc] text-[length:var(--heading-small-font-size)] text-center tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

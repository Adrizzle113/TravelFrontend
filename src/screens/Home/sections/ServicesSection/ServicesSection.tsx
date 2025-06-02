import {
  ArrowRightIcon,
  Building2Icon,
  DumbbellIcon,
  HomeIcon,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const services = [
  {
    icon: <Building2Icon className="h-10 w-10" />,
    title: "Apartemen Terbaik",
    description: "Memberikan list apartemen terbaik di seluruh Indonesia",
    isHighlighted: true,
  },
  {
    icon: <HomeIcon className="h-10 w-10" />,
    title: "Ruangan Modern",
    description: "Memberikan kamar yang modern dan sesuai dengan impian anda",
    isHighlighted: false,
  },
  {
    icon: <DumbbellIcon className="h-10 w-10" />,
    title: "Fasilitas Lengkap",
    description: "Menyediakan semua fasilitas yang mendukung dan memadai",
    isHighlighted: false,
  },
];

export const ServicesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-[35px] p-5 md:p-[100px] relative bg-[#f3ecdc]">
      <div className="flex-col w-full max-w-[720px] gap-5 flex items-center relative">
        <span className="relative self-stretch font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] text-center tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
          LAYANAN YANG KAMI BERIKAN
        </span>

        <h2 className="relative self-stretch font-heading-big font-[number:var(--heading-big-font-weight)] text-heading text-[length:var(--heading-big-font-size)] text-center tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)] [font-style:var(--heading-big-font-style)]">
          Layanan Yang Mendukung
        </h2>
      </div>

      <img
        className="hidden md:block w-[115px] h-[74px] absolute top-[63px] left-[294px] object-cover"
        alt="Dot smoke"
        src="/images/dot_smoke.svg"
      />

      <div className="flex flex-col md:flex-row items-center gap-[30px] self-stretch w-full">
        {services.map((service, index) => (
          <Card
            key={index}
            className={`w-full md:flex-1 rounded-[30px] overflow-hidden border-none ${
              service.isHighlighted ? "bg-app-accent" : "bg-white-smoke"
            }`}
          >
            <CardContent className="flex flex-col items-center gap-[25px] p-[30px] md:p-[50px]">
              <div className="text-app-secondary text-[length:var(--icon-big-font-size)] leading-[var(--icon-big-line-height)]">
                {service.icon}
              </div>

              <div className="flex gap-2.5 self-stretch w-full flex-col items-start">
                <h3
                  className={`self-stretch mt-[-1.00px] font-heading-standar font-[number:var(--heading-standar-font-weight)] text-[length:var(--heading-standar-font-size)] text-center tracking-[var(--heading-standar-letter-spacing)] leading-[var(--heading-standar-line-height)] [font-style:var(--heading-standar-font-style)] ${
                    service.isHighlighted ? "text-[#f3ecdc]" : "text-heading"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`self-stretch font-body font-[number:var(--body-font-weight)] text-[length:var(--body-font-size)] text-center tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)] ${
                    service.isHighlighted
                      ? "text-[#ffffffbf]"
                      : "text-[color:var(--body)]"
                  }`}
                >
                  {service.description}
                </p>
              </div>

              <Button className="w-full md:w-auto px-10 py-5 bg-app-primary rounded-[30px] hover:bg-app-primary/90">
                <span className="font-accent font-[number:var(--accent-font-weight)] text-[#f3ecdc] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                  LIHAT SELENGKAPNYA
                </span>
                <ArrowRightIcon className="ml-2.5 h-5 w-5 text-[#f3ecdc]" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-[15px] flex-wrap justify-center">
        <span className="font-accent font-[number:var(--accent-font-weight)] text-heading text-[length:var(--accent-font-size)] text-center tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
          LIHAT SELURUH LAYANAN
        </span>

        <Button variant="link" className="p-0 h-auto">
          <span className="font-accent font-[number:var(--accent-font-weight)] text-app-primary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            LIHAT SELENGKAPNYA
          </span>
          <ArrowRightIcon className="ml-2.5 h-5 w-5 text-app-primary" />
        </Button>
      </div>
    </section>
  );
};

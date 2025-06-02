import { CheckCircleIcon, PlayIcon, QuoteIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const WhyChooseUsSection = (): JSX.Element => {
  // Service features data
  const serviceFeatures = [
    {
      title: "Garansi Layanan",
      description: "Mendapatkan keamanan",
    },
    {
      title: "List Apartemen Terbaik",
      description: "Apartemen terbaik di Indonesia",
    },
    {
      title: "Gratis Konsultasi",
      description: "Tersedia konsultasi terbaik",
    },
  ];

  // Benefits data
  const benefits = [
    "24 Hours Consultation",
    "Certification Team",
    "More Office Branch",
    "Best Work Result",
  ];

  return (
    <section className="flex flex-col lg:flex-row items-start gap-[30px] p-4 lg:p-[100px] relative w-full bg-app-accent overflow-hidden">
      <div className="flex flex-col justify-center gap-[35px] w-full lg:w-2/3">
        <div className="flex flex-col items-start justify-center gap-5 relative w-full">
          <p className="w-full font-accent text-app-secondary text-sm md:text-base">
            KENAPA HARUS GUNAKAN LAYANAN KAMI
          </p>

          <h2 className="w-full font-heading-big text-[#f3ecdc] text-2xl sm:text-3xl md:text-4xl lg:text-[45px] leading-tight">
            Kami Memberikan Hasil Layanan Terbaik Untuk Apartemen Anda
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-[35px] w-full">
          <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto rounded-[30px] border-[10px] border-solid border-[#f3ecdc] relative p-5">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button
                variant="default"
                className="w-[60px] h-[60px] lg:w-[90px] lg:h-[90px] rounded-full bg-app-secondary hover:bg-app-secondary/90 flex items-center justify-center"
              >
                <PlayIcon className="h-6 w-6 lg:h-8 lg:w-8 text-[#f3ecdc]" />
              </Button>
            </div>
            <img 
              src="/images/Video.png"
              alt="Video thumbnail"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="flex flex-col items-start gap-[25px] py-[30px] w-full lg:w-1/2">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-5 w-full">
                <div className="text-app-secondary text-[length:var(--icon-medium-font-size)]">
                  {/* Icon placeholder */}
                </div>

                <div className="flex flex-col items-start gap-[7px] flex-1">
                  <h3 className="w-full font-heading-small text-[#f3ecdc] text-lg md:text-xl">
                    {feature.title}
                  </h3>

                  <p className="w-full font-body text-white-transparent text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="w-full lg:w-1/3 bg-tertiary rounded-[30px] border-none">
        <CardContent className="p-6 lg:p-[50px] space-y-5">
          <div className="text-app-border text-6xl">
            <QuoteIcon className="w-12 h-12" />
          </div>

          <blockquote className="font-quote text-white-transparent text-lg md:text-xl">
            " Fasilitas memadai tempat yang modern"
          </blockquote>

          <p className="hidden md:block w-full font-body text-white-transparent text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex flex-col gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircleIcon className="text-[#f3ecdc] w-5 h-5 flex-shrink-0" />
                <p className="flex-1 font-body text-white-transparent text-sm md:text-base">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <img
        className="hidden lg:block w-[99px] h-16 absolute top-[46px] right-[20%] object-cover"
        alt="Dot smoke"
        src="/images/dot_smoke.svg"
      />
    </section>
  );
};

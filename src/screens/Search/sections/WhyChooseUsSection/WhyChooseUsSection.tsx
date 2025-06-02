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
    "Konsultasi Gratis",
    "Bersertifikat",
    "Layanan Terbaik",
    "Tempat Idaman",
  ];

  return (
    <section className="flex flex-col md:flex-row items-start gap-[60px] p-6 md:p-[100px] relative w-full bg-app-accent">
      <div className="flex flex-col justify-center gap-[35px] flex-1 self-stretch">
        <div className="flex flex-col items-start justify-center gap-5 relative w-full">
          <p className="w-full font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            KENAPA HARUS GUNAKAN LAYANAN KAMI
          </p>

          <h2 className="w-full font-heading-big font-[number:var(--heading-big-font-weight)] text-[#f3ecdc] text-[length:var(--heading-big-font-size)] tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)] [font-style:var(--heading-big-font-style)]">
            Kami Memberikan Hasil Layanan Terbaik Untuk Penginapan Anda
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-[35px] w-full">
          <div className="flex flex-col items-center justify-center flex-1 rounded-[30px] border-[10px] border-solid border-[#f3ecdc] aspect-square md:aspect-auto [background:url(..//video.png)_50%_50%_/_cover]">
            <Button
              variant="default"
              className="w-[90px] h-[90px] rounded-full bg-app-secondary hover:bg-app-secondary/90 flex items-center justify-center"
            >
              <PlayIcon className="h-8 w-8 text-[#f3ecdc]" />
            </Button>
          </div>

          <div className="flex flex-col items-start gap-[25px] py-[30px] flex-1">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-5 w-full">
                <div className="text-app-secondary text-[length:var(--icon-medium-font-size)]">
                  {/* Icon placeholder - would be replaced with actual icon */}
                </div>

                <div className="flex flex-col items-start gap-[7px] flex-1">
                  <h3 className="w-full font-heading-small font-[number:var(--heading-small-font-weight)] text-[#f3ecdc] text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
                    {feature.title}
                  </h3>

                  <p className="w-full font-body font-[number:var(--body-font-weight)] text-white-transparent text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="flex flex-col w-full md:w-[393px] items-start gap-5 p-[50px] bg-tertiary rounded-[30px] border-none text-white-transparent">
        <CardContent className="p-0 space-y-5 w-full">
          <div className="text-app-border text-[length:var(--icon-big-font-size)]">
            <QuoteIcon size={45} />
          </div>

          <blockquote className="font-quote font-[number:var(--quote-font-weight)] text-white-transparent text-[length:var(--quote-font-size)] tracking-[var(--quote-letter-spacing)] leading-[var(--quote-line-height)] [font-style:var(--quote-font-style)]">
            &quot; Lorem ipsum dolor sit amet consectetur adipsing elit. &quot;
          </blockquote>

          <p className="font-body font-[number:var(--body-font-weight)] text-white-transparent text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex flex-col gap-[15px] w-full">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-[15px]">
                <CheckCircleIcon className="text-[#f3ecdc] w-5 h-5" />
                <p className="flex-1 font-body font-[number:var(--body-font-weight)] text-white-transparent text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <img
        className="hidden md:block absolute top-[46px] right-[620px] w-[99px] h-16 object-cover"
        alt="Dot smoke"
        src="/images/dot_smoke.svg"
      />
    </section>
  );
};

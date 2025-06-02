import { CheckCircleIcon, PlayIcon, QuoteIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

// Benefits data for mapping
const benefitItems = [
  {
    title: "Garansi Layanan",
    description: "Mendapatkan keamanan",
  },
  {
    title: "List Apartemen Terbaik",
    description: "Apartemen terbaik di Indonesia",
  },
  {
    title: "Free Consultation",
    description: "Tersedia konsultasi terbaik",
  },
];

// Testimonial features data
const testimonialFeatures = [
  "24 Hours Consultation",
  "Certification Team",
  "More Office Branch",
  "Best Work Result",
];

export const BenefitsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col md:flex-row items-start gap-[60px] p-[100px] relative bg-app-accent w-full">
      <div className="flex flex-col justify-center gap-[35px] flex-1 self-stretch">
        <div className="flex flex-col justify-center gap-5 w-full">
          <p className="font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            KENAPA HARUS GUNAKAN LAYANAN KAMI
          </p>

          <h2 className="font-heading-big font-[number:var(--heading-big-font-weight)] text-[#f3ecdc] text-[length:var(--heading-big-font-size)] tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)] [font-style:var(--heading-big-font-style)]">
            Kami Memberikan Hasil Layanan Terbaik Untuk Apartemen Anda
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-[35px] w-full">
          {/* Video section */}
          <div className="flex-1 rounded-[30px] border-[10px] border-solid border-[#f3ecdc] [background:url(../assets/images/video.png)_50%_50%_/_cover] flex items-center justify-center min-h-[250px]">
            <button className="flex items-center justify-center w-[90px] h-[90px] bg-app-secondary rounded-full">
              <PlayIcon size={35} className="text-[#f3ecdc]" />
            </button>
          </div>

          {/* Benefits list */}
          <div className="flex flex-col items-start gap-[25px] py-[30px] flex-1">
            {benefitItems.map((item, index) => (
              <div key={index} className="flex items-start gap-5 w-full">
                <div className="w-fit mt-[-1.00px] text-app-secondary">
                  {/* Icon placeholder - empty in original */}
                </div>

                <div className="flex flex-col items-start gap-[7px] flex-1">
                  <h3 className="w-full mt-[-1.00px] font-heading-small font-[number:var(--heading-small-font-weight)] text-[#f3ecdc] text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
                    {item.title}
                  </h3>

                  <p className="w-full font-body font-[number:var(--body-font-weight)] text-white-transparent text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial card */}
      <Card className="w-full md:w-[393px] bg-tertiary rounded-[30px] overflow-hidden border-none">
        <CardContent className="flex flex-col items-start gap-5 p-[50px]">
          <QuoteIcon size={45} className="text-app-border" />

          <blockquote className="w-full font-quote font-[number:var(--quote-font-weight)] text-[#ffffffbf] text-[length:var(--quote-font-size)] tracking-[var(--quote-letter-spacing)] leading-[var(--quote-line-height)] [font-style:var(--quote-font-style)]">
            &quot; Fasilitas memadai tempat yang modern&quot;
          </blockquote>

          <p className="w-full font-body font-[number:var(--body-font-weight)] text-[#ffffffbf] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex flex-col items-start gap-[15px] w-full">
            {testimonialFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-[15px] w-full">
                <CheckCircleIcon size={20} className="text-[#f3ecdc]" />
                <span className="flex-1 mt-[-1.00px] font-body font-[number:var(--body-font-weight)] text-[#ffffffbf] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <img
        className="w-[99px] h-16 top-[46px] left-[720px] absolute object-cover"
        alt="Dot smoke"
        src="/images/dot_smoke.svg"
      />
    </section>
  );
};

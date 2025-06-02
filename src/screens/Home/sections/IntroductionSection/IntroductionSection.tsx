import { ArrowRightIcon, AwardIcon, CalendarDaysIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const IntroductionSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#f3ecdc]">
      <div className="container mx-auto flex flex-col lg:flex-row items-start gap-[60px] px-4 md:px-10 lg:px-[75px] py-[100px]">
        {/* Left column with images */}
        <div className="flex-1 relative">
          <div className="relative">
            {/* Only show this image on larger screens */}
            <div className="hidden lg:block w-[390px] h-[499px] rounded-[30px] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Modern apartment exterior"
                src="/images/bedroom_interior.png"
              />
            </div>

            {/* Responsive bordered image */}
            <div className="lg:absolute lg:-bottom-20 lg:right-0 w-full lg:w-[390px]">
              <img
                className="w-full max-w-[calc(100%-40px)] mx-auto lg:w-[390px] h-[499px] object-cover rounded-[30px] border-[12px] border-solid border-[#f3ecdc] shadow-shadow-shape"
                alt="Cozy living space"
                src="/images/cozy_living_space.png"
              />
            </div>

            {/* Only show card on larger screens */}
            <Card className="hidden lg:block absolute left-[50px] bottom-[-60px] w-[234px] bg-app-accent rounded-[30px] border-none overflow-hidden z-10">
              <CardContent className="flex flex-col items-center justify-center gap-2.5 p-[25px]">
                <div className="inline-flex items-start justify-center gap-2.5">
                  <div className="text-app-secondary font-heading-big font-[number:var(--heading-big-font-weight)] text-[length:var(--heading-big-font-size)] tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)]">
                    99
                  </div>
                  <div className="font-body text-[#ffffffbf] text-[length:var(--body-font-size)] leading-[var(--body-line-height)]">
                    %
                  </div>
                </div>
                <div className="self-stretch font-heading-small font-[number:var(--heading-small-font-weight)] text-[#f3ecdc] text-[length:var(--heading-small-font-size)] text-center tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)]">
                  Customer Suka
                </div>
              </CardContent>
            </Card>

            <img
              className="hidden lg:block absolute w-[115px] h-[74px] top-[133px] left-[428px] object-cover"
              alt="Dot smoke"
              src="/images/dot_smoke.svg"
            />
          </div>
        </div>

        {/* Right column with content */}
        <div className="flex-1 flex flex-col items-start justify-center gap-[30px] mt-6 lg:mt-0 lg:py-[60px] relative">
          <img
            className="hidden lg:block absolute w-[115px] h-[74px] top-[23px] left-[339px] object-cover"
            alt="Dot smoke"
            src="/images/dot_smoke.svg"
          />

          <div className="self-stretch font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)]">
            LAYANAN TERBAIK
          </div>

          <h2 className="self-stretch font-heading-big font-[number:var(--heading-big-font-weight)] text-heading text-[length:var(--heading-big-font-size)] tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)]">
            Kami Berikan Apartemen dan Layanan Terbaik
          </h2>

          <p className="self-stretch font-body font-[number:var(--body-font-weight)] text-[color:var(--body)] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)]">
            Memberikan layanan terbaik sampai anda mendapatkan apartemen sesuai
            dengan impian
          </p>

          {/* Feature items */}
          <div className="flex items-start gap-5 self-stretch w-full">
            <AwardIcon className="text-app-secondary w-[35px] h-[35px]" />
            <div className="flex flex-col items-start gap-[7px] flex-1">
              <h3 className="self-stretch font-heading-small font-[number:var(--heading-small-font-weight)] text-heading text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)]">
                No.1&nbsp;&nbsp;Layanan Apartemen Terbaik Di Indonesia
              </h3>
            </div>
          </div>

          <div className="flex items-start gap-5 self-stretch w-full">
            <CalendarDaysIcon className="text-app-secondary w-[35px] h-[35px]" />
            <div className="flex flex-col items-start gap-[7px] flex-1">
              <h3 className="self-stretch font-heading-small font-[number:var(--heading-small-font-weight)] text-heading text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)]">
                15 Tahun Lebih Kami Bersedia Layani Anda
              </h3>
            </div>
          </div>

          <Button className="flex px-[40px] py-[20px] items-center justify-center gap-[10px] rounded-[30px] bg-[#588157] w-full md:w-auto">
            <span className="font-accent font-[number:var(--accent-font-weight)] text-[#f3ecdc] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)]">
              LIHAT SELENGKAPNYA
            </span>
            <ArrowRightIcon className="w-5 h-5 text-[#f3ecdc]" />
          </Button>
        </div>
      </div>
    </section>
  );
};

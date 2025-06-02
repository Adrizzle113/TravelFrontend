
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="w-full py-20 px-4 md:px-20 bg-[#f3ecdc]">
      <Card className="w-full rounded-[30px] overflow-hidden border-none">
        <CardContent className="p-0">
          <div
            className="flex flex-col items-center justify-center gap-5 p-10 md:p-20 relative w-full rounded-[30px] overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, rgba(52,78,65,1) 0%, rgba(0,0,0,0.11) 100%), url(..//box.png) 50% 50% / cover",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-5 max-w-2xl relative z-10">
              <h2 className="font-heading-very-big text-[#f3ecdc] text-[length:var(--heading-very-big-font-size)] text-center tracking-[var(--heading-very-big-letter-spacing)] leading-[var(--heading-very-big-line-height)]">
                Tempati Apartemen Terbaik Sesuai Impian Anda
              </h2>

              <p className="font-body text-white-transparent text-[length:var(--body-font-size)] text-center tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)]">
                Tersedia banyak sekali apartemen terbaik yang siap anda tempati
              </p>

              <Button className="bg-app-primary hover:bg-app-primary/90 rounded-[30px] px-10 py-5 h-auto">
                <span className="font-accent text-[#f3ecdc] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)]">
                  LIHAT SELENGKAPNYA
                </span>
              </Button>
            </div>

            <img
              className="absolute w-[99px] h-16 top-[51px] left-16 object-cover"
              alt="Dot smoke"
              src="/images/dot_smoke.svg"
            />

            <img
              className="absolute w-[99px] h-16 bottom-16 right-16 object-cover"
              alt="Dot smoke"
              src="/images/dot_smoke.svg"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

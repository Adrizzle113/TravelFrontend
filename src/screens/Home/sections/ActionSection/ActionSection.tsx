
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ActionSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center py-[100px] px-4 md:px-[100px] bg-[#f3ecdc] w-full">
      <Card className="w-full rounded-[30px] overflow-hidden border-none">
        <CardContent className="p-0">
          <div
            className="flex flex-col items-center justify-center gap-5 p-8 md:p-20 relative w-full rounded-[30px] overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, rgba(52,78,65,1) 0%, rgba(0,0,0,0.11) 100%), url(..//box.png) 50% 50% / cover",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-5 max-w-2xl relative z-10">
              <h2 className="font-heading-very-big text-[#f3ecdc] text-2xl sm:text-3xl md:text-4xl lg:text-[55px] text-center leading-tight">
                Tempati Apartemen Terbaik Sesuai Impian Anda
              </h2>

              <p className="font-body text-white-transparent text-sm md:text-base text-center">
                Tersedia banyak sekali apartemen terbaik yang siap anda tempati
              </p>

              <Button className="bg-app-primary hover:bg-app-primary/90 rounded-[30px] px-6 md:px-10 py-3 md:py-5 h-auto">
                <span className="font-accent text-[#f3ecdc] text-sm md:text-base">
                  LIHAT SELENGKAPNYA
                </span>
              </Button>
            </div>

            <img
              className="hidden md:block w-[99px] h-16 absolute top-[51px] left-16 object-cover"
              alt="Dot smoke"
              src="/images/dot_smoke.svg"
            />

            <img
              className="hidden md:block w-[99px] h-16 absolute bottom-16 right-16 object-cover"
              alt="Dot smoke"
              src="/images/dot_smoke.svg"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

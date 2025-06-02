
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <section 
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(52,78,65,0.95) 32%, rgba(0,0,0,0.13) 100%), url('/images/Header.png')"
      }}
    >
      <div className="flex flex-col w-full min-h-screen">
        <div className="flex-1 flex items-center px-4 md:px-[100px]">
          <div className="flex items-start gap-[60px] relative w-full">
            <div className="flex flex-col w-full gap-[25px]">
              <p className="font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                TEMPATNYA SEWA APARTEMEN TERBAIK DI INDONESIA
              </p>

              <h1 className="[font-family:'Abril_Fatface',Helvetica] font-normal text-[55px] tracking-[0] leading-[55px]">
                <span className="text-[#f3ecdc]">Ayo, </span>
                <span className="text-[#a3b18a]">Cari</span>
                <span className="text-[#f3ecdc]"> Apartemen Impian </span>
                <span className="text-[#a3b18a]">Anda</span>
                <span className="text-[#f3ecdc]">&nbsp;</span>
                <span className="text-[#a3b18a]">Disini..</span>
              </h1>

              <p className="max-w-[591px] font-body font-[number:var(--body-font-weight)] text-[#ffffffbf] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
                Rumah Impian Anda, Hanya Satu Klik Jauhnya: Temukan Kenyamanan dalam
                Setiap Apartemen Di Indoensia.
              </p>

              <div className="flex flex-wrap items-start gap-[25px]">
                <Button className="px-10 py-5 bg-app-primary rounded-[30px] h-auto">
                  <span className="font-accent font-[number:var(--accent-font-weight)] text-[#f3ecdc] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                    LIHAT SELENGKAPNYA
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="px-10 py-5 bg-[#f3ecdc] border-0 rounded-[30px] h-auto"
                >
                  <span className="font-accent font-[number:var(--accent-font-weight)] text-app-primary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                    SEWA SEKARANG
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

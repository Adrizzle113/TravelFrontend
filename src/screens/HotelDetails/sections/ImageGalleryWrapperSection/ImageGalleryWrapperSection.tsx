import {
  ArrowRightIcon,
  CalendarDaysIcon,
  MinusIcon,
  PlusIcon,
  Users2Icon,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ImageGalleryWrapperSection = (): JSX.Element => {
  // Data for the booking controls
  const bookingControls = [
    {
      id: "date",
      content: (
        <>
          <CalendarDaysIcon className="h-6 w-6 text-app-secondary" />
          <div className="inline-flex items-center justify-center gap-2.5 p-2.5">
            <span className="text-xs text-[#4d4d4d] leading-[27.9px]">
              Check-in
            </span>
          </div>
          <ArrowRightIcon className="h-6 w-6" />
          <div className="inline-flex items-center justify-center gap-2.5 p-2.5">
            <span className="text-xs text-[#4d4d4d] leading-[27.9px]">
              Check-out
            </span>
          </div>
        </>
      ),
    },
    {
      id: "guests",
      content: (
        <>
          <Users2Icon className="h-6 w-6" />
          <div className="inline-flex items-center justify-center gap-2.5 p-2.5">
            <span className="text-xs text-[#4d4d4d] leading-[27.9px]">
              Orang
            </span>
          </div>
          <MinusIcon className="h-6 w-6" />
          <div className="inline-flex items-center justify-center gap-2.5 p-2.5">
            <span className="text-xl text-[#4d4d4d] leading-[27.9px]">2</span>
          </div>
          <PlusIcon className="h-6 w-6" />
        </>
      ),
    },
    {
      id: "price",
      content: (
        <div className="inline-flex items-center justify-center gap-2.5 p-2.5">
          <span className="text-[15px] text-[#4d4d4d] leading-[27.9px]">
            Harga
          </span>
        </div>
      ),
    },
  ];

  return (
    <section className="flex flex-col w-full items-start gap-[17px] px-[102px] pt-5 pb-2.5 bg-[#f3ecdc]">
      <div className="flex items-center justify-between w-full gap-[97px]">
        <div className="flex flex-col items-start gap-[15px]">
          <h2 className="font-normal text-black text-xl leading-[27.9px]">
            Atur Jadwal mu disini..
          </h2>

          <div className="flex flex-wrap items-start gap-[11px]">
            {bookingControls.map((control) => (
              <Button
                key={control.id}
                variant="outline"
                className="inline-flex items-center justify-center gap-[9px] px-[25px] py-[5px] bg-[#f3ecdc] rounded-[98px] border border-solid border-[#9b9b9b] h-auto"
              >
                {control.content}
              </Button>
            ))}
          </div>

          <p className="text-[#073937] text-[11.2px] tracking-[0.09px] leading-[16.0px] max-w-[505px]">
            Harap diperhatikan: Tata letak, furnitur, dan dekorasi ruangan Anda
            mungkin berbeda dari yang ditampilkan di sini.
          </p>
        </div>

        <Card className="flex w-[480px] items-center gap-[9.54e-07px] p-6 bg-[#588157] rounded-[15px] border-none">
          <CardContent className="flex items-center p-0">
            <img
              className="w-[27px] h-[38px]"
              alt="Security icon"
              src="/svg.svg"
            />

            <div className="flex flex-col pl-4">
              <div className="w-full">
                <p className="font-normal text-[#f3ecdc] text-[13.7px] tracking-[0.07px] leading-[20.0px]">
                  Pesan dengan ketenangan pikiran
                </p>
                <p className="font-normal text-[#f3ecdc] text-[13.3px] tracking-[0.07px] leading-[20.0px]">
                  sebelum check-in untuk pembayaran seluruh dana
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

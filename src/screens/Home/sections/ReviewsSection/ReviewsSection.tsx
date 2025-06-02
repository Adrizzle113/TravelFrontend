
import { ArrowRightIcon, PlayIcon, StarIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ReviewsSection = (): JSX.Element => {
  // Review data for mapping
  const reviews = [
    {
      quote:
        '" Suka banget sama layanan disini. sampe nemu apartemen impian aku "',
      image: "/rectangle-8.png",
      name: "Mr. John Doe",
      position: "MR. JOHN DOE",
    },
    {
      quote:
        '"Sangat elegan, modern, nyaman. pokonya the best banget pake layanan buat cari apartemen disini. "',
      image: "/rectangle-8-1.png",
      name: "Mr. John Doe",
      position: "MR. JOHN DOE",
    },
  ];

  return (
    <section className="bg-[#344e41] py-[100px] px-8 max-[980px]:px-4 w-full flex flex-col gap-[35px] relative overflow-hidden">
      {/* Header section */}
      <div className="flex max-[980px]:flex-col justify-between items-start min-[981px]:items-center w-full relative">
        <div className="flex flex-col gap-5">
          <span className="font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            APA YANG MEREKA KATAKAN
          </span>

          <h2 className="font-heading-big font-[number:var(--heading-big-font-weight)] text-[#f3ecdc] text-[length:var(--heading-big-font-size)] tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)] [font-style:var(--heading-big-font-style)] max-w-[633px]">
            Testimoni Pengunjung Kami
          </h2>
        </div>

        <div className="flex items-center gap-2.5 max-[980px]:mt-4">
          <span className="font-accent font-[number:var(--accent-font-weight)] text-[#f3ecdc] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            SEE ALL REVIEWS
          </span>
          <ArrowRightIcon className="text-[#f3ecdc] w-5 h-5" />
        </div>

        <img
          className="hidden min-[981px]:block w-[83px] h-[53px] absolute top-[-7px] right-[20%] object-cover"
          alt="Dot smoke"
          src="/images/dot_smoke.svg"
        />
      </div>

      {/* Content section */}
      <div className="flex max-[980px]:flex-col w-full gap-[30px]">
        {/* Left section with video */}
        <div className="relative max-[980px]:w-full min-[981px]:w-[317px] flex-shrink-0">
          <img
            className="absolute w-full h-full min-[981px]:w-[533px] min-[981px]:h-[372px] top-0 left-0 object-cover"
            alt="Rectangle"
            src="/rectangle-9.png"
          />

          <div className="relative flex items-center justify-center h-[372px] w-full pl-[30px] [background:url(..//video-1.png)_50%_50%_/_cover]">
            <div className="flex items-center justify-center w-[90px] h-[90px] bg-app-secondary rounded-full">
              <PlayIcon className="text-[#f3ecdc] w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Testimonials cards */}
        <div className="flex-1 flex max-[980px]:flex-col min-[981px]:flex-row gap-[30px] pl-0 min-[981px]:pl-[30px] py-[35px] [background:url(..//testimonials.png)_50%_50%_/_cover]">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="bg-[#f3ecdc] rounded-[30px] shadow-shadow flex-1"
            >
              <CardContent className="p-[35px] flex flex-col gap-[25px]">
                {/* StarIcon rating */}
                <div className="flex gap-2.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="text-stars w-5 h-5 fill-stars"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-quote font-[number:var(--quote-font-weight)] text-[color:var(--body)] text-[length:var(--quote-font-size)] tracking-[var(--quote-letter-spacing)] leading-[var(--quote-line-height)] [font-style:var(--quote-font-style)]">
                  {review.quote}
                </p>

                {/* Author info */}
                <div className="flex items-center gap-[25px]">
                  <img
                    className="w-[75px] h-[75px] object-cover"
                    alt="Customer"
                    src={review.image}
                  />
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-heading-small font-[number:var(--heading-small-font-weight)] text-heading text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
                      {review.name}
                    </h3>
                    <span className="font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                      {review.position}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

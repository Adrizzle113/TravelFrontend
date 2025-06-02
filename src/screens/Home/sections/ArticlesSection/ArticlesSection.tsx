
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardFooter } from "../../../../components/ui/card";

export const ArticlesSection = (): JSX.Element => {
  // Article data for mapping
  const articles = [
    {
      image: "/rectangle-10.png",
      categories: [
        { name: "General", bgColor: "bg-tertiary" },
        { name: "Modern", bgColor: "bg-app-secondary" },
      ],
      title: "Kamar Terbaik Kebanggaan Keluarga",
      excerpt:
        "Pastinya keluarga pada pengen dong punya Rumah idaman yang bi..",
    },
    {
      image: "/rectangle-10-1.png",
      categories: [
        { name: "Nyaman", bgColor: "bg-tertiary" },
        { name: "Elegan", bgColor: "bg-app-secondary" },
      ],
      title: "10 Apartemen Paling Nyaman Di Indonesia",
      excerpt:
        "Indonesia adalah negara yang punya alam yang indah sekali di sel..",
    },
    {
      image: "/rectangle-10-2.png",
      categories: [
        { name: "Sunyi", bgColor: "bg-tertiary" },
        { name: "Adem", bgColor: "bg-app-secondary" },
      ],
      title: "Apartemen Terbaik Di Tengah Kota Jakarta",
      excerpt:
        "Kamu tau dong kota jakarta itu tempatnya panas banget, kalau ka...",
    },
  ];

  return (
    <section className="flex flex-col w-full items-start gap-[35px] pt-[50px] pb-[100px] px-4 md:px-8 lg:px-[100px] relative bg-[#f3ecdc] overflow-hidden">
      <div className="justify-between w-full flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 relative">
        <div className="flex gap-5 flex-col items-start relative">
          <div className="relative self-stretch mt-[-1.00px] font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            BACA BLOG KAMI
          </div>

          <h2 className="relative font-heading-big font-[number:var(--heading-big-font-weight)] text-heading text-[length:var(--heading-big-font-size)] tracking-[var(--heading-big-letter-spacing)] leading-[var(--heading-big-line-height)] [font-style:var(--heading-big-font-style)]">
            Postingan Artikel Seru
          </h2>
        </div>

        <div className="flex items-center gap-2.5 relative">
          <span className="relative font-accent font-[number:var(--accent-font-weight)] text-app-primary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            LIHAT SEMUA BLOG
          </span>
          <ArrowRightIcon className="text-app-primary" size={20} />
        </div>

        <img
          className="hidden lg:block w-[83px] h-[53px] absolute top-[-7px] right-[20%] object-cover"
          alt="Dot smoke"
          src="/images/dot_smoke.svg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full">
        {articles.map((article, index) => (
          <Card
            key={index}
            className="rounded-[30px] overflow-hidden bg-white-smoke border-none"
          >
            <div className="w-full h-[250px] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt={`Article ${index + 1}`}
                src={article.image}
              />
            </div>

            <CardContent className="p-[35px] flex flex-col gap-[15px]">
              <div className="flex items-start gap-[15px] flex-wrap">
                {article.categories.map((category, catIndex) => (
                  <Badge
                    key={catIndex}
                    className={`${category.bgColor} text-[#f3ecdc] px-5 py-2.5 rounded-[30px] font-body-small font-[number:var(--body-small-font-weight)] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]`}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>

              <h3 className="font-heading-standar font-[number:var(--heading-standar-font-weight)] text-heading text-[length:var(--heading-standar-font-size)] tracking-[var(--heading-standar-letter-spacing)] leading-[var(--heading-standar-line-height)] [font-style:var(--heading-standar-font-style)]">
                {article.title}
              </h3>

              <p className="font-body font-[number:var(--body-font-weight)] text-[color:var(--body)] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
                {article.excerpt}
              </p>
            </CardContent>

            <CardFooter className="px-[35px] pb-[35px] pt-0">
              <div className="flex items-center gap-2.5">
                <span className="font-accent font-[number:var(--accent-font-weight)] text-app-primary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                  BACA ARTIKEL
                </span>
                <ArrowRightIcon className="text-app-primary" size={20} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

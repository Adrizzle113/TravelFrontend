import { Clock, ArrowRight } from "lucide-react";
import { Card } from "../../../../components/ui/card";

export const HotNewsSection = (): JSX.Element => {
  const mainArticle = {
    title: "The Rise of Boutique Hotels: Unveiling Unique and Personalized Hospitality",
    excerpt: "Explore the growing phenomenon of boutique hotels, offering unique and personalized hospitality. Aenean id fringilla urna. Suspendisse...",
    image: "/images/bedroom_interior.png",
    date: "24 April 2023",
    readTime: "4 min read",
  };

  const sideArticles = [
    {
      title: "Hotels Go Beyond Accommodation to Embrace Memorable Stays",
      excerpt: "Discover how hotels are now provide a place to sleep, but also create accom modation...",
      image: "/images/cozy_living_space.png",
      date: "Read more →",
    },
    {
      title: "Luxury Reimagined: Iconic Hotels Renovating to Exceed Expectations",
      excerpt: "Witness the transformation of iconic hotels as they undergo extensive renovations. Be fascinated by the extraordinary...",
      image: "/images/living_room_decor.png",
      date: "Read more →",
    },
    {
      title: "Preserving History Through Unique Accommodations",
      excerpt: "Learn about hotels that preserve the essence of history through unique accommodations. Commemorate...",
      image: "/images/bedroom_interior.png",
      date: "Read more →",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-heading-big text-4xl lg:text-5xl text-gray-900">
            Our Hot News
          </h2>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <span className="font-medium">SHOW MORE</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-[400px] overflow-hidden bg-gray-200">
              <img
                src={mainArticle.image}
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{mainArticle.readTime}</span>
                </div>
                <span>{mainArticle.date}</span>
              </div>
              <h3 className="font-heading-standar text-2xl text-gray-900 mb-4">
                {mainArticle.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {mainArticle.excerpt}
              </p>
            </div>
          </Card>

          <div className="space-y-6">
            {sideArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-4 p-4">
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading-small text-lg text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="text-sm text-gray-500">
                      {article.date}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

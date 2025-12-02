import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../../../../components/ui/button";

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-8xl text-gray-200 font-serif mb-4">"</div>
            <h2 className="font-heading-big text-3xl lg:text-4xl text-gray-900 mb-8">
              What Our<br />Customer Says
            </h2>
          </div>

          <div className="relative bg-gray-50 rounded-3xl p-12">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-300 hover:bg-gray-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-300 hover:bg-gray-200"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                The app has a user-friendly interface, and I was quickly able to find
                hotels that fit our needs. I can see photos of the room, available
                amenities, and reviews from previous guests, which helps me make an
                informed decision.
              </p>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 mb-4 overflow-hidden">
                  <img
                    src="/images/bedroom_interior.png"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-heading-standar text-lg text-gray-900 mb-1">
                  Khomaron Raiman
                </h4>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

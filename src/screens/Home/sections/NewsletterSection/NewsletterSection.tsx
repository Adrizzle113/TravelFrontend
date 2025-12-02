import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { ArrowRight, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export const NewsletterSection = (): JSX.Element => {
  return (
    <section className="bg-gradient-to-br from-[#2a3d2f] via-[#3a4d3f] to-[#4a5d4f] py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading-big text-3xl text-white mb-8 text-center">
            Subscribe to News and Resources
          </h2>

          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white rounded-full pl-6 pr-16 py-7 text-gray-900 border-0 focus-visible:ring-2 focus-visible:ring-white"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-white/20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
                <span className="font-heading-standar text-xl text-white">GreenDoors</span>
              </div>
            </div>

            <div>
              <h3 className="font-heading-standar text-white mb-4">Home</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading-standar text-white mb-4">Service</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading-standar text-white mb-4">Event</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Explore</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading-standar text-white mb-4">About Us</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-sm">
            <p>© 2023 GreenDoors. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

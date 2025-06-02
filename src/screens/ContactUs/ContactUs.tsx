import { ContactFormSection } from "./sections/ContactFormSection";
import { Navigation } from "../../components/layout/Navigation";
import { Button } from "../../components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const ContactUs = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full">
      <Navigation />
      <section 
        className="relative min-h-[60vh] bg-cover bg-center flex items-center pt-[10%]"
        style={{
          backgroundImage: "url('/images/Header.png')",
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(243,236,220,0.95) 32%, rgba(243,236,220,0.8) 100%)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 md:px-[100px]">
          <div className="max-w-2xl">
            <span className="font-accent text-app-secondary tracking-[2.25px] uppercase block mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading-very-big text-app-accent mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-lg md:text-xl text-app-accent/80 mb-8 max-w-xl">
              We're here to help you find your perfect home. Reach out to us for any questions or assistance you need.
            </p>
            <Button 
              className="bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] px-8 py-4 rounded-[30px] inline-flex items-center gap-2"
            >
              <span className="font-accent">Get Started</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
      <ContactFormSection />
    </main>
  );
};

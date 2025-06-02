import { Button } from "../../components/ui/button";
import { Navigation } from "../../components/layout/Navigation";
import { Card, CardContent } from "../../components/ui/card";
import { StarIcon, DollarSignIcon, WrenchIcon, UsersIcon } from "lucide-react";

const About = (): JSX.Element => {
  const metrics = [
    { number: "10K+", label: "Travel Agents" },
    { number: "50+", label: "Global Suppliers" },
    { number: "24/7", label: "Support Available" },
    { number: "99%", label: "Customer Satisfaction" },
  ];

  const features = [
    {
      title: "Exclusive Supplier Rates",
      description: "Access wholesale pricing and special deals from top travel suppliers worldwide.",
      icon: StarIcon
    },
    {
      title: "Smart Commission Tracking",
      description: "Automated commission tracking and reconciliation to maximize your earnings.",
      icon: DollarSignIcon
    },
    {
      title: "Powerful Booking Tools",
      description: "Customizable booking engine that adapts to your business needs.",
      icon: WrenchIcon
    },
    {
      title: "Client Management",
      description: "Comprehensive CRM to manage client relationships and preferences.",
      icon: UsersIcon
    }
  ];

  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-app-accent flex items-center pt-[10vh]">
        <div className="w-full px-4 md:px-[100px] py-[100px] flex flex-col md:flex-row items-center gap-[60px]">
          <div className="w-full md:w-1/2">
            <h1 className="text-[#f3ecdc] text-4xl md:text-5xl lg:text-6xl font-heading-very-big mb-[25px]">
              Empowering Travel Agents with Modern Technology
            </h1>
            <p className="text-white-transparent text-lg md:text-xl">
              We're revolutionizing the travel industry by providing agents with cutting-edge tools and technology to grow their business and deliver exceptional service.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/images/living_room_decor.png"
              alt="Modern Living Room"
              className="w-full h-[400px] object-cover rounded-[30px] shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-[100px] px-4 md:px-[100px] bg-[#f3ecdc]">
        <div className="flex flex-col md:flex-row items-center gap-[60px]">
          <div className="w-full md:w-1/2">
            <img
              src="/images/cozy_living_space.png"
              alt="Cozy Living Space"
              className="w-full h-[400px] object-cover rounded-[30px] shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-[30px]">
              {metrics.map((metric, index) => (
                <Card key={index} className="border-none bg-white-smoke rounded-[30px]">
                  <CardContent className="flex flex-col items-center justify-center p-[35px] text-center">
                    <span className="text-app-primary text-4xl font-heading-big mb-[15px]">
                      {metric.number}
                    </span>
                    <span className="text-heading text-sm font-accent">
                      {metric.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-[100px] px-4 md:px-[100px] bg-white">
        <div className="flex flex-col items-center">
          <h2 className="text-heading text-3xl md:text-4xl font-heading-big text-center mb-[60px]">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-2 gap-[30px] w-full">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-none rounded-[30px] overflow-hidden backdrop-blur-md bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-[35px] bg-gradient-to-br from-white/50 to-white/30">
                  <div className="mb-[25px] inline-flex p-4 rounded-full bg-app-primary/10">
                    <feature.icon className="w-8 h-8 text-app-primary" />
                  </div>
                  <h3 className="text-heading text-xl font-heading-standar mb-[15px]">
                    {feature.title}
                  </h3>
                  <p className="text-[color:var(--body)]">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="mt-12 bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] px-12 py-6 rounded-[30px] text-lg font-accent shadow-lg hover:shadow-xl transition-all duration-300">
            Start Here
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-app-accent py-[100px] px-4 md:px-[100px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[#f3ecdc] text-3xl md:text-4xl font-heading-big mb-[25px]">
            Ready to Transform Your Travel Business?
          </h2>
          <p className="text-white-transparent text-lg mb-[35px] max-w-2xl">
            Join thousands of successful travel agents who are growing their business with our platform.
          </p>
          <Button className="bg-app-primary hover:bg-app-primary/90 text-[#f3ecdc] px-10 py-5 rounded-[30px]">
            <span className="font-accent">Get Started Today</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default About;

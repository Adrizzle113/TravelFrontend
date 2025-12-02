import { Navigation } from "../../components/layout/Navigation";
import { Button } from "../../components/ui/button";
import { Check } from "lucide-react";

export const Home = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full overflow-x-hidden bg-brand-off-white">
      <Navigation />
      <section
        className="relative w-full h-screen bg-[length:120%] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/HeroHotel.jpg')" }}
      >
        <div className="absolute inset-0 bg-brand-ultra-dark/50" />

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-brand-off-white mb-6 leading-tight">
              Tarifas Melhores<br />
              Comissões Maiores<br />
              Feito para Agentes Brasileiros
            </h1>

            <p className="font-body text-lg md:text-xl text-brand-off-white/90 mb-8 leading-relaxed">
              Pare de perder dinheiro com fornecedores caros.<br />
              Tenha acesso a tarifas 20–30% mais baixas do que TAAP, Booking.com e HotelBeds — e fique com o lucro que você merece.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-brand-olive hover:bg-brand-deep-olive text-brand-off-white font-medium text-lg px-8 py-6 backdrop-blur-sm bg-opacity-90 transition-all duration-300 hover:shadow-lg"
              >
                Criar Conta Grátis
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-brand-off-white/80 text-brand-off-white hover:bg-brand-off-white/10 font-medium text-lg px-8 py-6 backdrop-blur-md bg-white/5 transition-all duration-300 hover:shadow-lg"
              >
                Ver Tarifas de Exemplo
              </Button>
            </div>

            <div className="flex flex-col gap-3 text-brand-off-white/95 font-body">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-brand-pastel-green" />
                <span>Sem mensalidade</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-brand-pastel-green" />
                <span>Sem contrato</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-brand-pastel-green" />
                <span>Suporte em português via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

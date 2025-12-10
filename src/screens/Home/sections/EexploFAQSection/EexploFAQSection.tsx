import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqApi } from '@/lib/eexploApi';
import { FAQ } from '@/lib/supabase';

export const EexploFAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await faqApi.getAll();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const placeholderFAQs = [
    {
      id: '1',
      question: 'How do I book a tour package?',
      answer: 'Booking a tour package is easy! Simply browse our packages, select your preferred tour, fill out the booking form with your details, and make the payment. You will receive a confirmation email with your itinerary and booking details.',
      order: 1,
      active: true
    },
    {
      id: '2',
      question: 'What is your cancellation policy?',
      answer: 'Our cancellation policy varies by package. Generally, cancellations made 30+ days before departure receive a full refund minus processing fees. Cancellations 15-29 days before departure receive a 50% refund. Less than 15 days notice may result in no refund. Please check specific package terms.',
      order: 2,
      active: true
    },
    {
      id: '3',
      question: 'Do you offer customized travel packages?',
      answer: 'Yes! We specialize in creating customized travel experiences tailored to your preferences, budget, and schedule. Contact our team to discuss your requirements and we will design a personalized itinerary just for you.',
      order: 3,
      active: true
    },
    {
      id: '4',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express), debit cards, bank transfers, and PayPal. For large bookings, we also offer installment payment plans. Contact us for more payment options.',
      order: 4,
      active: true
    },
    {
      id: '5',
      question: 'Is travel insurance included in the package?',
      answer: 'Travel insurance is not automatically included but we highly recommend it. We offer comprehensive travel insurance options that cover medical emergencies, trip cancellations, baggage loss, and more. You can add insurance during the booking process.',
      order: 5,
      active: true
    },
  ];

  const displayFAQs = faqs.length > 0 ? faqs : placeholderFAQs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-4xl text-eexplo-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-inter text-lg text-eexplo-text-secondary">
              Find answers to common questions about our services and booking process
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-eexplo-accent-orange"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {displayFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="border border-eexplo-light-gray rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-eexplo-warm-gray transition-colors"
                  >
                    <span className="font-inter font-semibold text-lg text-eexplo-text-primary pr-4">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-eexplo-accent-orange flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-eexplo-medium-gray flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 pt-0 font-inter text-eexplo-text-secondary">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

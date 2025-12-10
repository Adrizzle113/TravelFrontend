import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { contactApi } from '@/lib/eexploApi';
import { toast } from 'react-toastify';

export const EexploContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destinations = [
    'Italy',
    'Indonesia',
    'Nepal',
    'Bangladesh',
    'Maldives',
    'Thailand',
    'France',
    'Spain',
    'Japan',
    'Australia',
    'Other',
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await contactApi.submit(formData);
      toast.success('Thank you! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-eexplo-warm-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-4xl text-eexplo-text-primary mb-4">
              Get in Touch
            </h2>
            <p className="font-inter text-lg text-eexplo-text-secondary">
              Have questions or ready to plan your next adventure? Contact us and our team will be happy to help
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-inter font-medium text-eexplo-text-primary mb-2 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="font-inter"
                    required
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-eexplo-text-primary mb-2 block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="font-inter"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-inter font-medium text-eexplo-text-primary mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="font-inter"
                  />
                </div>
                <div>
                  <label className="font-inter font-medium text-eexplo-text-primary mb-2 block">
                    Destination of Interest
                  </label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) => handleChange('destination', value)}
                  >
                    <SelectTrigger className="font-inter">
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest} value={dest} className="font-inter">
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="font-inter font-medium text-eexplo-text-primary mb-2 block">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Tell us about your travel plans and requirements..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="font-inter min-h-32"
                  required
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-eexplo-accent-orange hover:bg-eexplo-accent-orange/90 text-white font-inter font-semibold px-12 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

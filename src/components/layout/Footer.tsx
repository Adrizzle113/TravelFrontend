import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const companyLinks = [
  { text: "About Us", path: "/about" },
  { text: "Destinations", path: "/destinations" },
  { text: "Tour Packages", path: "/packages" },
  { text: "Services", path: "/services" },
  { text: "Contact Us", path: "/contact" },
];

const discoverLinks = [
  { text: "Italy", path: "/destinations" },
  { text: "Indonesia", path: "/destinations" },
  { text: "Maldives", path: "/destinations" },
  { text: "Thailand", path: "/destinations" },
  { text: "Nepal", path: "/destinations" },
];

const locations = [
  "New York, USA",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
];

const socialLinks = [
  { icon: <FacebookIcon className="w-5 h-5" />, name: "facebook", url: "#" },
  { icon: <LinkedinIcon className="w-5 h-5" />, name: "linkedin", url: "#" },
  { icon: <TwitterIcon className="w-5 h-5" />, name: "twitter", url: "#" },
  { icon: <InstagramIcon className="w-5 h-5" />, name: "instagram", url: "#" },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="bg-eexplo-dark-gray text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info Column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="font-inter font-bold text-2xl">Eexplo</h3>
            </Link>
            <p className="font-inter text-white/70 mb-4 leading-relaxed">
              Turn the world into your playground. Discover extraordinary destinations and create unforgettable memories since 2010.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-eexplo-accent-orange flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links Column */}
          <div>
            <h4 className="font-inter font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="font-inter text-white/70 hover:text-eexplo-accent-orange transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links Column */}
          <div>
            <h4 className="font-inter font-bold text-lg mb-4">Discover</h4>
            <ul className="space-y-2">
              {discoverLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="font-inter text-white/70 hover:text-eexplo-accent-orange transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-inter font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 text-eexplo-accent-orange flex-shrink-0 mt-0.5" />
                <span className="font-inter text-white/70">
                  123 Travel Street, NY 10001
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MailIcon className="w-5 h-5 text-eexplo-accent-orange flex-shrink-0 mt-0.5" />
                <span className="font-inter text-white/70">
                  hello@eexplo.com
                </span>
              </li>
              <li className="flex items-start gap-2">
                <PhoneIcon className="w-5 h-5 text-eexplo-accent-orange flex-shrink-0 mt-0.5" />
                <span className="font-inter text-white/70">
                  +1 (555) 123-4567
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/20 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-white/60 text-sm">
            © 2024 Eexplo. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="font-inter text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="font-inter text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import {
  ChevronRightIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  TwitterIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const quickLinks = [
  { text: "Home", path: "/" },
  { text: "About Us", path: "/about" },
  { text: "Check-in Check-out", path: "/check" },
  { text: "Layanan", path: "/services" },
  { text: "Blog", path: "/blog" },
];

const siteLinks = [
  { text: "Syarat dan ketentuan", path: "/terms" },
  { text: "Disclaimer", path: "/disclaimer" },
  { text: "Hubungi kami", path: "/contact" },
  { text: "GDPR", path: "/gdpr" },
  { text: "Aturan pemakaian", path: "/rules" },
];

const socialLinks = [
  { icon: <FacebookIcon className="w-5 h-5" />, name: "facebook" },
  { icon: <TwitterIcon className="w-5 h-5" />, name: "twitter" },
  { icon: <InstagramIcon className="w-5 h-5" />, name: "instagram" },
  { icon: <StarIcon className="w-5 h-5" />, name: "pinterest" },
];

const contactInfo = [
  { icon: <MapPinIcon className="w-5 h-5" />, text: "Jakarta, Indonesia" },
  { icon: <StarIcon className="w-5 h-5" />, text: "Hello@Email.com" },
  { icon: <PhoneIcon className="w-5 h-5" />, text: "( +62 ) 123 456 789" },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start gap-[60px] pt-[100px] pb-[30px] px-[100px] bg-app-accent">
      <div className="flex flex-wrap items-start gap-[30px] relative w-full">
        {/* Brand Column */}
        <div className="flex flex-col w-full md:w-[391px] items-start gap-[25px] pr-[60px]">
          <Link to="/" className="flex items-center gap-[11px]">
            <img
              className="w-[38px] h-[38px]"
              alt="House Logo"
              src="/group-7529-1.png"
            />
            <div className="[font-family:'Poppins',Helvetica] font-medium text-white text-3xl tracking-[4.50px]">
              HOUSE.
            </div>
          </Link>

          <div className="flex flex-col gap-[15px]">
            <p className="font-body font-[number:var(--body-font-weight)] text-[#ffffffbf] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
              Aplikasi terbaik layanan penginapan <br />
              di seluruh apartemen dan hotel di Indoensia
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="text-[#f3ecdc] text-xl cursor-pointer"
              >
                {social.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col items-start gap-[25px] flex-1">
          <h3 className="font-heading-standar font-[number:var(--heading-standar-font-weight)] text-[#f3ecdc] text-[length:var(--heading-standar-font-size)] tracking-[var(--heading-standar-letter-spacing)] leading-[var(--heading-standar-line-height)]">
            Quick Links
          </h3>

          <div className="flex flex-col items-start gap-[15px] w-full">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center w-full gap-[15px] cursor-pointer"
              >
                <ChevronRightIcon className="w-5 h-5 text-[#f3ecdc]" />
                <span className="font-body font-[number:var(--body-font-weight)] text-[#ffffffbf] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)]">
                  {link.text}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Site Links Column */}
        <div className="flex flex-col items-start gap-[25px] flex-1">
          <h3 className="font-heading-standar font-[number:var(--heading-standar-font-weight)] text-[#f3ecdc] text-[length:var(--heading-standar-font-size)] tracking-[var(--heading-standar-letter-spacing)] leading-[var(--heading-standar-line-height)]">
            Site Links
          </h3>

          <div className="flex flex-col items-start gap-[15px] w-full">
            {siteLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center w-full gap-[15px] cursor-pointer"
              >
                <ChevronRightIcon className="w-5 h-5 text-[#f3ecdc]" />
                <span className="font-body font-[number:var(--body-font-weight)] text-[#ffffffbf] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)]">
                  {link.text}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col items-start gap-[25px] flex-1">
          <h3 className="font-heading-standar font-[number:var(--heading-standar-font-weight)] text-[#f3ecdc] text-[length:var(--heading-standar-font-size)] tracking-[var(--heading-standar-letter-spacing)] leading-[var(--heading-standar-line-height)]">
            Tetap bersama kami
          </h3>

          <div className="flex flex-col items-start gap-[15px] w-full">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start w-full gap-[15px]">
                <div className="text-[#f3ecdc]">{info.icon}</div>
                <span className="font-body font-[number:var(--body-font-weight)] text-[#ffffffbf] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)]">
                  {info.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full pt-[30px]">
        <Separator className="bg-[#ffffff4c] mb-[30px]" />
        <div className="text-center font-accent font-[number:var(--accent-font-weight)] text-[#f3ecdc] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)]">
          COPYRIGHT DIESNATALIS
        </div>
      </div>
    </footer>
  );
};

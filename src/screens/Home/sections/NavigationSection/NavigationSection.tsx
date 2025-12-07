import {
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  PlayIcon,
  StarIcon,
  TwitterIcon,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";

export const NavigationSection = (): JSX.Element => {
  const socialLinks = [
    { icon: <FacebookIcon className="text-[black]" />, name: "Facebook" },
    { icon: <TwitterIcon className="text-[#f3ecdc]" />, name: "Twitter" },
    { icon: <InstagramIcon className="text-[#f3ecdc]" />, name: "Instagram" },
    {
      icon: (
        <div className="[font-family:'Font_Awesome_6_Brands-Regular',Helvetica] font-normal text-[#f3ecdc] text-xl">
          pinterest
        </div>
      ),
      name: "Pinterest",
    },
  ];

  const navItems = [
    { label: "HOME", active: true },
    { label: "ABOUT US", active: false },
    { label: "CHECK IN - CHECK OUT", hasDropdown: true, active: false },
    { label: "BLOG", hasDropdown: true, active: false },
  ];

  return (
    <header className="flex flex-col items-start gap-[50px] md:gap-[100px] pt-0 pb-[50px] md:pb-[100px] px-5 md:px-[100px] bg-transparent [background:linear-gradient(90deg,rgba(52,78,65,0.95)_32%,rgba(0,0,0,0.13)_100%),url(..//header.png)_50%_50%_/_cover]">
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col md:flex-row w-full items-start gap-2.5 p-5 bg-app-primary rounded-[0px_0px_30px_30px] overflow-hidden">
          <div className="flex flex-col md:flex-row flex-1 items-start gap-[15px] md:gap-[35px]">
            <div className="flex items-center gap-2.5">
              <StarIcon className="text-[#f3ecdc] text-[var(--icon-small-font-size)]" />
              <span className="font-body-small font-[number:var(--body-small-font-weight)] text-[#ffffffbf] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]">
                Diesnatalis@Email.com
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <PhoneIcon className="text-[#f3ecdc] text-xl" />
              <span className="font-body-small font-[number:var(--body-small-font-weight)] text-[#ffffffbf] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]">
                ( +62 ) 123 456 789
              </span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-start md:justify-end gap-[35px] mt-4 md:mt-0">
            <div className="flex items-start gap-3">
              {socialLinks.map((link, index) => (
                <div key={index} className="cursor-pointer">
                  {link.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-[30px] mt-5">
          <div className="flex w-[186px] h-[38px] items-center gap-[11px]">
            <img
              className="w-[38px] h-[38px]"
              alt="House Logo"
              src="/group-7529.png"
            />
            <div className="[font-family:'Poppins',Helvetica] font-medium text-white text-3xl tracking-[4.50px] mt-[-4.50px] mb-[-2.50px]">
              HOUSE.
            </div>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-[35px] py-[35px] flex-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div
                  className={`font-accent font-[number:var(--accent-font-weight)] ${
                    item.active ? "text-white" : "text-[#ffffffbf]"
                  } text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]`}
                >
                  {item.label}
                </div>
                {item.hasDropdown && (
                  <ChevronDownIcon className="text-[#ffffffbf] w-4 h-4" />
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-[30px]">
            <Button className="w-full md:w-auto px-10 py-5 bg-[#f3ecdc] rounded-[30px] h-auto">
              <span className="font-accent font-[number:var(--accent-font-weight)] text-[#588157] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                GET STARTED
              </span>
            </Button>

            <div className="md:hidden flex flex-col items-start gap-2.5 cursor-pointer">
              <img
                className="mt-[-3.00px] w-[33px] h-[3px]"
                alt="Menu line"
                src="/line-1.svg"
              />
              <img
                className="w-[33px] h-[3px]"
                alt="Menu line"
                src="/line-1.svg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-[30px] md:gap-[60px] w-full">
        <div className="flex flex-col w-full md:w-[712px] gap-[25px]">
          <div className="font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
            TEMPATNYA SEWA APARTEMEN TERBAIK DI INDONESIA
          </div>

          <h1 className="font-heading-very-big font-[number:var(--heading-very-big-font-weight)] text-transparent text-[2rem] md:text-[length:var(--heading-very-big-font-size)] tracking-[var(--heading-very-big-letter-spacing)] leading-[1.2] md:leading-[var(--heading-very-big-line-height)] [font-style:var(--heading-very-big-font-style)]">
            <span className="text-[#f3ecdc]">Ayo, </span>
            <span className="text-[#a3b18a]">Cari</span>
            <span className="text-[#f3ecdc]"> Apartemen Impian </span>
            <span className="text-[#a3b18a]">Anda</span>
            <span className="text-[#f3ecdc]">&nbsp;&nbsp;</span>
            <span className="text-[#a3b18a]">Disini..</span>
          </h1>

          <p className="w-full md:w-[591px] font-body font-[number:var(--body-font-weight)] text-[#ffffffbf] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
            Rumah Impian Anda, Hanya Satu Klik Jauhnya: Temukan Kenyamanan dalam
            Setiap Apartemen Di Indoensia.
          </p>

          <div className="flex flex-col md:flex-row items-start gap-[25px]">
            <Button className="w-full md:w-auto px-10 py-5 bg-app-primary rounded-[30px] h-auto">
              <span className="font-accent font-[number:var(--accent-font-weight)] text-[#f3ecdc] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                LIHAT SELENGKAPNYA
              </span>
            </Button>
            <Button className="w-full md:w-auto px-10 py-5 bg-[#f3ecdc] rounded-[30px] h-auto">
              <span className="font-accent font-[number:var(--accent-font-weight)] text-app-primary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                SEWA SEKARANG
              </span>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center flex-1">
          <Button
            className="flex w-[90px] h-[90px] items-center justify-center bg-app-secondary rounded-[100px]"
            variant="secondary"
          >
            <PlayIcon className="text-[#f3ecdc] text-[length:var(--icon-medium-font-size)]" />
          </Button>
        </div>
      </div>
    </header>
  );
};

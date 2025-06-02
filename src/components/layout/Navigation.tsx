import {
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  TwitterIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const Navigation = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const socialLinks = [
    { icon: <FacebookIcon className="text-[#f3ecdc]" />, name: "Facebook" },
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
    { label: "HOME", path: "/", active: location.pathname === "/" },
    { label: "ABOUT US", path: "/about", active: location.pathname === "/about" },
    { label: "CONTACT US", path: "/contact", active: location.pathname === "/contact" },
    { 
      label: "BLOG", 
      hasDropdown: true, 
      active: false,
      items: ["Latest Posts", "Categories"],
      path: "/blog"
    },
  ];

  const handleGetStarted = () => {
    navigate('/auth/login');
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex flex-col items-start w-full">
      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-[30px] px-5 md:px-[100px] py-5">
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-[11px]">
            <img
              className="w-[38px] h-[38px]"
              alt="House Logo"
              src="/group-7529.png"
            />
            <div className="[font-family:'Poppins',Helvetica] font-medium text-white text-3xl tracking-[4.50px]">
              HOUSE.
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center py-[35px]">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-[35px] whitespace-nowrap">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.hasDropdown ? (
                      <>
                        <NavigationMenuTrigger className="flex items-center gap-2.5 bg-transparent hover:bg-transparent focus:bg-transparent">
                          <span
                            className={`font-accent font-[number:var(--accent-font-weight)] ${
                              item.active ? "text-white" : "text-[#ffffffbf]"
                            } text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]`}
                          >
                            {item.label}
                          </span>
                          <ChevronDownIcon className="text-[#ffffffbf] w-4 h-4" />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="flex flex-col p-2">
                            {item.items?.map((subItem, subIndex) => (
                              <Button
                                key={subIndex}
                                variant="ghost"
                                className="justify-start"
                              >
                                {subItem}
                              </Button>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`font-accent font-[number:var(--accent-font-weight)] ${
                          item.active ? "text-white" : "text-[#ffffffbf]"
                        } text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-[30px]">
            <Button 
              onClick={handleGetStarted}
              className="hidden lg:flex px-10 py-5 bg-[#f3ecdc] rounded-[30px] h-auto"
            >
              <span className="font-accent font-[number:var(--accent-font-weight)] text-[#588157] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                GET STARTED
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <div className="p-3 cursor-pointer">
                    <MenuIcon className="w-8 h-8 text-white" />
                  </div>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-[#344e41] p-0">
                  <SheetHeader className="p-6 border-b border-[#ffffff1a]">
                    <SheetTitle className="text-[#f3ecdc]">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col p-6">
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className={`py-3 px-4 rounded-lg ${
                          item.active
                            ? "text-white bg-[#ffffff1a]"
                            : "text-[#ffffffbf]"
                        } font-accent text-lg hover:bg-[#ffffff1a] transition-colors`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Button 
                      onClick={handleGetStarted}
                      className="mt-6 w-full px-10 py-5 bg-[#f3ecdc] rounded-[30px] h-auto"
                    >
                      <span className="font-accent font-[number:var(--accent-font-weight)] text-[#588157] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                        GET STARTED
                      </span>
                    </Button>
                    <div className="mt-6 pt-6 border-t border-[#ffffff1a]">
                      <div className="flex justify-center gap-4">
                        {socialLinks.map((link, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className="hover:bg-[#ffffff1a]"
                          >
                            {link.icon}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
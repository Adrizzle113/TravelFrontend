import {
  ChevronDownIcon,
  MenuIcon,
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

  const navItems = [
    { label: "Destinations", path: "/destinations", active: location.pathname === "/destinations" },
    { label: "Packages", path: "/packages", active: location.pathname === "/packages" },
    { label: "Services", path: "/services", active: location.pathname === "/services" },
    { label: "Blog", path: "/blog", active: location.pathname === "/blog" },
    {
      label: "More",
      hasDropdown: true,
      active: false,
      items: [
        { label: "About Us", path: "/about" },
        { label: "Contact Us", path: "/contact" },
        { label: "Hotel Search", path: "/search" },
        { label: "Travel Agencies", path: "/travel-agencies" },
        { label: "White Label", path: "/white-label" },
        { label: "Individual Bookings", path: "/individual-bookings" }
      ],
      path: "/more"
    },
  ];

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleSignUp = () => {
    navigate('/auth/register');
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">BookJá</span>
          </Link>

          <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-8">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.hasDropdown ? (
                      <>
                        <NavigationMenuTrigger className="flex items-center gap-1 bg-transparent hover:bg-transparent focus:bg-transparent text-gray-700 hover:text-gray-900 font-medium text-sm">
                          {item.label}
                          <ChevronDownIcon className="w-4 h-4" />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="flex flex-col p-2 min-w-[200px]">
                            {item.items?.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`font-medium text-sm ${
                          item.active ? "text-gray-900" : "text-gray-700"
                        } hover:text-gray-900 transition-colors`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={handleLogin}
              variant="ghost"
              className="text-gray-700 hover:text-gray-900 font-medium text-sm"
            >
              Login
            </Button>
            <Button
              onClick={handleSignUp}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm px-6 rounded-full"
            >
              Sign Up
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="w-6 h-6 text-gray-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={`py-2 px-4 rounded-lg ${
                        item.active
                          ? "text-gray-900 bg-gray-100"
                          : "text-gray-700"
                      } font-medium text-sm hover:bg-gray-100 transition-colors`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                    <Button
                      onClick={handleLogin}
                      variant="outline"
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={handleSignUp}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
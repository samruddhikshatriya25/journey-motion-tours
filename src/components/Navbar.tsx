
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeDown } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Compass, User, LogIn, LogOut, CreditCard, DollarSign } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    window.addEventListener("scroll", handleScroll);
    checkLoginStatus();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    toast.success("You've been logged out successfully!");
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-2xl font-bold ${
                isScrolled || location.pathname !== "/" ? "text-travel-teal" : "text-white"
              }`}
            >
              Wonderlust Canvas
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-1"
          >
            <NavLink 
              to="/" 
              label="Explore" 
              icon={<Compass className="h-4 w-4" />} 
              isScrolled={isScrolled}
              isActive={location.pathname === '/'}
            />
            <NavLink 
              to="/create-blog" 
              label="Create Blog" 
              isScrolled={isScrolled}
              isActive={location.pathname === '/create-blog'}
            />
            <NavLink 
              to="/search" 
              label="Search" 
              icon={<Search className="h-4 w-4" />} 
              isScrolled={isScrolled}
              isActive={location.pathname === '/search'}
            />
            <NavLink 
              to="/booking" 
              label="Book Now" 
              icon={<CreditCard className="h-4 w-4" />} 
              isScrolled={isScrolled}
              isActive={location.pathname === '/booking'}
            />
            <NavLink 
              to="/subscription-plans" 
              label="Plans" 
              icon={<DollarSign className="h-4 w-4" />} 
              isScrolled={isScrolled}
              isActive={location.pathname === '/subscription-plans'}
            />
            
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                className="flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="ml-2 bg-travel-teal hover:bg-travel-teal/90">Sign Up</Button>
                </Link>
              </>
            )}
          </motion.nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`${!isScrolled && location.pathname === "/" ? "text-white hover:bg-white/20" : ""}`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <MobileNavLink to="/" label="Explore" icon={<Compass className="h-5 w-5 mr-2" />} />
                  <MobileNavLink to="/create-blog" label="Create Blog" />
                  <MobileNavLink to="/search" label="Search" icon={<Search className="h-5 w-5 mr-2" />} />
                  <MobileNavLink to="/booking" label="Book Now" icon={<CreditCard className="h-5 w-5 mr-2" />} />
                  <MobileNavLink to="/subscription-plans" label="Subscription Plans" icon={<DollarSign className="h-5 w-5 mr-2" />} />
                  
                  {isLoggedIn ? (
                    <Button 
                      variant="ghost" 
                      className="flex items-center justify-start px-2 py-3 text-foreground hover:bg-muted rounded-md w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  ) : (
                    <>
                      <MobileNavLink to="/login" label="Login" icon={<LogIn className="h-5 w-5 mr-2" />} />
                      <Link to="/signup" className="w-full">
                        <Button className="w-full bg-travel-teal hover:bg-travel-teal/90">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  isScrolled: boolean;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon, isScrolled, isActive }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-travel-teal/10 text-travel-teal"
        : isScrolled || to !== "/"
        ? "text-gray-700 hover:bg-gray-100"
        : "text-white hover:bg-white/20"
    } flex items-center`}
  >
    {icon && <span className="mr-1">{icon}</span>}
    {label}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex items-center px-2 py-3 text-foreground hover:bg-muted rounded-md"
  >
    {icon}
    {label}
  </Link>
);

export default Navbar;

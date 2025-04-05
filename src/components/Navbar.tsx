
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeDown } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Compass, User, LogIn } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                isScrolled || location.pathname !== "/" ? "text-primary" : "text-white"
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
            <Button variant="ghost" className="flex items-center">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="ml-2">Sign Up</Button>
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
                  <MobileNavLink to="/login" label="Login" icon={<LogIn className="h-5 w-5 mr-2" />} />
                  <Button className="w-full">Sign Up</Button>
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
        ? "bg-primary/10 text-primary"
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

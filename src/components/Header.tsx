
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Services', path: '/services' },
    { title: 'Gallery', path: '/gallery' },
    { title: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed w-full z-30 transition-all duration-300 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="z-50">
          <img 
            src="/lovable-uploads/ec7cfc27-e79c-47fa-bda0-0b1c58f6ded2.png" 
            alt="Design by Aarav" 
            className="h-16 w-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link uppercase tracking-wider text-sm font-display",
                location.pathname === item.path ? "active" : ""
              )}
            >
              {item.title}
            </Link>
          ))}
          <Button 
            asChild
            className="bg-aarav-black hover:bg-aarav-gray-600 text-white rounded-none"
          >
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 text-aarav-black"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          "fixed inset-0 bg-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out z-40",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
          <nav className="flex flex-col gap-6 items-center">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link uppercase tracking-wider font-display text-lg",
                  location.pathname === item.path ? "active" : ""
                )}
              >
                {item.title}
              </Link>
            ))}
            <Button 
              asChild
              className="mt-4 bg-aarav-black hover:bg-aarav-gray-600 text-white rounded-none"
            >
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

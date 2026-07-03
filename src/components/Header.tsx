
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
    <>
      <header
        className={cn(
          "fixed w-full z-30 transition-all duration-300 py-4",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-black/20 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="z-50">
            <img
              src="/lovable-uploads/ec7cfc27-e79c-47fa-bda0-0b1c58f6ded2.png"
              alt="Design by Aarav"
              className={cn(
                "h-16 w-auto transition-all duration-300",
                !isScrolled && "brightness-0 invert"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link uppercase tracking-wider text-sm font-display transition-colors duration-300",
                  location.pathname === item.path ? "active" : "",
                  isScrolled ? "text-aarav-black hover:text-aarav-gold" : "text-white hover:text-aarav-gold"
                )}
              >
                {item.title}
              </Link>
            ))}
            <Button
              asChild
              className={cn(
                "rounded-none transition-colors duration-300",
                isScrolled
                  ? "bg-aarav-black hover:bg-aarav-gold text-white"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
              )}
            >
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden relative z-[110] transition-colors duration-300",
              mobileMenuOpen ? "text-aarav-black" : isScrolled ? "text-aarav-black" : "text-white"
            )}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay — rendered outside header to escape its stacking context */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-[100] bg-white transition-all duration-300 ease-in-out",
          mobileMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-8 items-center justify-center h-full w-full px-6">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link uppercase tracking-wider font-display text-lg",
                location.pathname === item.path ? "active text-aarav-gold" : "text-aarav-black"
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
    </>
  );
};


export default Header;

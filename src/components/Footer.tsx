
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscription logic would go here
  };

  return (
    <footer className="bg-aarav-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <img 
              src="/lovable-uploads/ec7cfc27-e79c-47fa-bda0-0b1c58f6ded2.png" 
              alt="Design by Aarav" 
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="mt-4 text-aarav-gray-300">
              Transforming spaces into extraordinary experiences. We create interiors that tell your story.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="text-white hover:text-aarav-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-aarav-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-aarav-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-aarav-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-aarav-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-aarav-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-aarav-gray-300 hover:text-white transition-colors">Project Gallery</Link></li>
              <li><Link to="/blog" className="text-aarav-gray-300 hover:text-white transition-colors">Blog & News</Link></li>
              <li><Link to="/forum" className="text-aarav-gray-300 hover:text-white transition-colors">Forum</Link></li>
              <li><Link to="/contact" className="text-aarav-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-aarav-gray-300">123 Design Street, Creative City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-aarav-gray-300 hover:text-white transition-colors">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@designbyaarav.com" className="text-aarav-gray-300 hover:text-white transition-colors">info@designbyaarav.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif mb-4">Newsletter</h3>
            <p className="text-aarav-gray-300 mb-4">Subscribe to receive design tips, news and updates</p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-aarav-gray-600 text-white border-aarav-gray-500 focus:border-aarav-gold"
                required
              />
              <Button type="submit" className="w-full bg-aarav-gold hover:bg-opacity-80 text-aarav-black">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-aarav-gray-600 flex flex-col md:flex-row justify-between items-center text-sm text-aarav-gray-300">
          <p>© 2025 Design by Aarav. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

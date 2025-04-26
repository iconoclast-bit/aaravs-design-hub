
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 relative">
              <span className="text-aarav-gold">/</span> About Aarav
              <span className="absolute -bottom-3 left-0 w-20 h-0.5 bg-aarav-gold"></span>
            </h2>
            <p className="text-aarav-gray-600 mb-6 text-balance">
              Design by Aarav is a premium interior design studio founded on the principles of elegance, 
              functionality, and innovation. With over a decade of industry experience, we've transformed 
              countless spaces into extraordinary environments that inspire and delight.
            </p>
            <p className="text-aarav-gray-600 mb-8 text-balance">
              Our approach combines timeless design principles with contemporary innovations, 
              creating spaces that are both aesthetically striking and perfectly tailored to our clients' 
              lifestyles and preferences. We believe that exceptional design should enhance daily life 
              while reflecting the unique personality of each client.
            </p>
            <Button className="bg-aarav-black hover:bg-aarav-gold text-white">
              Learn More About Us
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Interior Designer Aarav" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-aarav-gold p-6 text-aarav-black">
              <p className="font-serif text-xl">A decade of design excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

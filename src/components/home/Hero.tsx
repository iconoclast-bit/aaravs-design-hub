
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-aarav-black overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-50 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400)',
          backgroundPosition: 'center 30%'
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-aarav-black/60 via-aarav-black/40 to-aarav-black"></div>
      
      <div className="container mx-auto px-4 relative z-20 text-center text-white">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/ec7cfc27-e79c-47fa-bda0-0b1c58f6ded2.png" 
            alt="Design by Aarav" 
            className="h-28 md:h-32 w-auto brightness-0 invert mb-6 animate-fade-in"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 animate-fade-up">
            Elevating Spaces<br className="hidden md:block" /> With Refined Design
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-aarav-gray-200 mb-8 animate-fade-up animate-delay-100">
            Creating luxurious interiors that reflect your personality and lifestyle, blending artistry with functionality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-200">
            <Button className="bg-white text-aarav-black hover:bg-aarav-gold hover:text-white px-8 py-6">
              Explore Our Work
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-aarav-black px-8 py-6">
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white opacity-70"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;


import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Aarav transformed our house into a home that perfectly reflects our personality. The attention to detail and understanding of our needs was exceptional.",
    author: "Emily & David Johnson",
    role: "Residential Clients"
  },
  {
    id: 2,
    content: "The redesign of our office space has significantly improved team morale and productivity. Aarav's vision for functional yet beautiful workspaces is unmatched.",
    author: "Michael Chen",
    role: "CEO, TechVision Inc."
  },
  {
    id: 3,
    content: "Working with Aarav was a seamless experience from concept to completion. The final design exceeded our expectations and has received countless compliments.",
    author: "Sarah Williams",
    role: "Boutique Hotel Owner"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="section-padding bg-aarav-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Client Testimonials</h2>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center px-8">
            <div className="mb-8 text-5xl text-aarav-gold">"</div>
            <p className="text-xl md:text-2xl mb-8 italic">
              {testimonials[currentIndex].content}
            </p>
            <div className="w-12 h-0.5 bg-aarav-gold mx-auto mb-6"></div>
            <h4 className="font-serif text-xl mb-1">{testimonials[currentIndex].author}</h4>
            <p className="text-aarav-gray-300">{testimonials[currentIndex].role}</p>
          </div>
          
          <div className="flex justify-center mt-12 space-x-4">
            <button 
              onClick={prevTestimonial} 
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-aarav-gold hover:border-aarav-gold transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial} 
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-aarav-gold hover:border-aarav-gold transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Residential Design',
    description: 'Transform your home into a sanctuary that reflects your personality and meets your lifestyle needs.',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Commercial Spaces',
    description: 'Create inspiring workplaces that boost productivity and impress clients with thoughtful design.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Hospitality Design',
    description: 'Craft memorable experiences for guests through atmospheric and functional hospitality spaces.',
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  }
];

const Services = () => {
  return (
    <section className="section-padding bg-aarav-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Design Services</h2>
          <p className="max-w-2xl mx-auto text-lg text-aarav-gray-500">
            Comprehensive design solutions tailored to transform your spaces into functional works of art
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-3">{service.title}</h3>
                <p className="text-aarav-gray-500 mb-4">{service.description}</p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center text-aarav-black font-medium hover:text-aarav-gold transition-colors"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/services" 
            className="inline-flex items-center border-b-2 border-aarav-black pb-1 font-medium text-lg hover:border-aarav-gold hover:text-aarav-gold transition-colors"
          >
            View All Services <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;

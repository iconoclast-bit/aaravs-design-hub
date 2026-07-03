import { ArrowRight, Check, User, Building, Hotel, Home, Palette, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { portfolio } from '@/assets/portfolio';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    id: 1,
    title: 'Residential Design',
    description: 'Transform your home into a sanctuary that reflects your personality and meets your lifestyle needs with our comprehensive residential design services.',
    image: portfolio.a1,
    icon: Home,
    features: [
      'Complete home makeovers',
      'Room-by-room design',
      'Furniture selection & placement',
      'Color scheme consultation',
      'Lighting design',
      'Space optimization'
    ],
    
  },
  {
    id: 2,
    title: 'Commercial Spaces',
    description: 'Create inspiring workplaces that boost productivity and impress clients with thoughtful, functional commercial design solutions.',
    image: portfolio.office1,
    icon: Building,
    features: [
      'Office space planning',
      'Retail store design',
      'Restaurant & cafe interiors',
      'Corporate branding integration',
      'Ergonomic workspace design',
      'Client presentation areas'
    ],
    
  },
  {
    id: 3,
    title: 'Hospitality Design',
    description: 'Craft memorable experiences for guests through atmospheric and functional hospitality spaces that tell your brand story.',
    image: portfolio.livingDining,
    icon: Hotel,
    features: [
      'Hotel lobby & guest rooms',
      'Restaurant design',
      'Spa & wellness centers',
      'Event & conference spaces',
      'Boutique accommodations',
      'Guest experience optimization'
    ],
    
  }
];

const additionalServices = [
  {
    title: 'Design Consultation',
    description: 'One-on-one consultation to discuss your vision and create a roadmap for your project.',
    icon: User,
    
  },
  {
    title: 'Color & Material Selection',
    description: 'Expert guidance on color schemes, textures, and materials that align with your aesthetic.',
    icon: Palette,
    
  },
  {
    title: 'Lighting Design',
    description: 'Comprehensive lighting solutions to enhance ambiance and functionality.',
    icon: Lightbulb,
    
  }
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-background pt-32">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 animate-fade-up">
            Design Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-up animate-delay-200">
            Transforming spaces into extraordinary experiences with our comprehensive design solutions
          </p>
          <Button 
            size="lg" 
            className="bg-aarav-black hover:bg-aarav-gray-600 text-white animate-fade-up animate-delay-300"
          >
            Schedule Consultation
          </Button>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Core Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive design solutions tailored to transform your spaces into functional works of art
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            {services.map((service, index) => (
              <Card key={service.id} className="overflow-hidden bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  </div>
                  <CardContent className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center mb-4">
                      <service.icon className="h-8 w-8 text-aarav-gold mr-3" />
                      <h3 className="text-2xl lg:text-3xl font-serif">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">{service.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-lg">What's Included:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <Check className="h-4 w-4 text-aarav-gold mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-end">
                      <Button variant="outline" className="border-aarav-black hover:bg-aarav-black hover:text-white">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Additional Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized services to complement your main design project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center p-6 bg-card hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <service.icon className="h-12 w-12 text-aarav-gold mx-auto mb-4" />
                  <h3 className="text-xl font-serif mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Design Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'Initial meeting to understand your needs, style, and budget' },
              { step: '02', title: 'Concept', description: 'Develop design concepts and present mood boards and layouts' },
              { step: '03', title: 'Design', description: 'Create detailed plans, 3D renderings, and material selections' },
              { step: '04', title: 'Implementation', description: 'Project management and execution with trusted contractors' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-aarav-gold text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-serif mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-aarav-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss your project and create something extraordinary together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-aarav-gold hover:bg-aarav-gold/90 text-black">
              Book Consultation
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
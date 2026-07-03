import { useState } from 'react';
import { Filter, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { portfolio } from '@/assets/portfolio';

// Only authorized portfolio images — loop/reuse, never stock.
const imagePool = [
  portfolio.livingArch,
  portfolio.livingDining,
  portfolio.a1,
  portfolio.a4,
  portfolio.a5,
  portfolio.office1,
  portfolio.office2,
];
const img = (i: number) => imagePool[i % imagePool.length];

const projects = [
  {
    id: 1,
    title: 'Modern Minimalist Apartment',
    category: 'Residential',
    location: 'Mumbai, India',
    year: '2024',
    image: img(0),
    description: 'A sleek 1,200 sq ft apartment featuring clean lines, neutral tones, and smart storage solutions. The design maximizes natural light while maintaining a sophisticated urban aesthetic.',
    features: ['Open floor plan', 'Smart home integration', 'Custom built-ins', 'Premium finishes']
  },
  {
    id: 2,
    title: 'Contemporary Office Space',
    category: 'Commercial',
    location: 'Bengaluru, India',
    year: '2024',
    image: img(1),
    description: 'A 15,000 sq ft tech company headquarters designed to foster creativity and collaboration. Features flexible workspaces, wellness areas, and sustainable materials.',
    features: ['Flexible workstations', 'Wellness rooms', 'Sustainable materials', 'Acoustic design']
  },
  {
    id: 3,
    title: 'Luxury Villa Renovation',
    category: 'Residential',
    location: 'Gurugram, India',
    year: '2023',
    image: img(2),
    description: 'Complete renovation of a 6,500 sq ft Mediterranean villa. Blend of classic architecture with contemporary interiors, featuring a resort-style pool area.',
    features: ['Pool house design', 'Wine cellar', 'Home theater', 'Master suite renovation']
  },
  {
    id: 4,
    title: 'Boutique Hotel Lobby',
    category: 'Hospitality',
    location: 'Goa, India',
    year: '2023',
    image: img(3),
    description: 'Art Deco-inspired lobby design for a luxury boutique hotel. Features custom lighting, local artwork, and luxurious materials that reflect Miami\'s vibrant culture.',
    features: ['Custom lighting design', 'Local art curation', 'Marble reception desk', 'Tropical garden views']
  },
  {
    id: 5,
    title: 'Industrial Loft Conversion',
    category: 'Residential',
    location: 'Delhi, India',
    year: '2023',
    image: img(4),
    description: 'Transformation of a 2,800 sq ft warehouse into a modern family loft. Exposed brick, steel beams, and large windows create an urban sanctuary.',
    features: ['Exposed brick walls', 'Steel beam ceiling', 'Mezzanine office', 'Industrial lighting']
  },
  {
    id: 6,
    title: 'Upscale Restaurant Interior',
    category: 'Commercial',
    location: 'Hyderabad, India',
    year: '2022',
    image: img(5),
    description: 'Elegant fine dining restaurant with a modern interpretation of classic steakhouse design. Rich materials and intimate lighting create an sophisticated atmosphere.',
    features: ['Custom banquette seating', 'Wine display walls', 'Mood lighting', 'Open kitchen design']
  },
  {
    id: 7,
    title: 'Wellness Spa Retreat',
    category: 'Hospitality',
    location: 'Rishikesh, India',
    year: '2022',
    image: img(6),
    description: 'Tranquil spa and wellness center designed to promote relaxation and rejuvenation. Natural materials and earth tones create a harmonious connection with nature.',
    features: ['Treatment rooms', 'Meditation garden', 'Hydrotherapy pools', 'Natural materials']
  },
  {
    id: 8,
    title: 'Executive Penthouse',
    category: 'Residential',
    location: 'Pune, India',
    year: '2022',
    image: img(7),
    description: 'Sophisticated penthouse design with panoramic city views. High-end finishes, custom furniture, and smart home technology create the ultimate luxury living experience.',
    features: ['Floor-to-ceiling windows', 'Rooftop terrace', 'Smart home automation', 'Custom millwork']
  }
];

const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-background pt-32">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 animate-fade-up">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-up animate-delay-200">
            Explore our collection of meticulously crafted spaces that showcase our design philosophy and attention to detail
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-aarav-black hover:bg-aarav-gray-600 text-white" 
                  : "border-aarav-black hover:bg-aarav-black hover:text-white"
                }
              >
                <Filter className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group cursor-pointer image-grid-item animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <Badge className="mb-2 bg-aarav-gold text-black">{project.category}</Badge>
                      <h3 className="text-xl font-serif mb-1">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.location} • {project.year}</p>
                      <div className="mt-4 flex items-center text-sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Project Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-aarav-black text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '12+', label: 'Years Experience' },
              { number: '50+', label: 'Awards Won' }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-3xl md:text-4xl font-bold text-aarav-gold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's create something extraordinary together. Contact us to discuss your vision and bring it to life.
          </p>
          <Button size="lg" className="bg-aarav-black hover:bg-aarav-gray-600 text-white">
            Start Your Project
          </Button>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-lg">
                  {selectedProject.location} • {selectedProject.year}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
                />
                <Badge className="mb-4 bg-aarav-gold text-black">{selectedProject.category}</Badge>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {selectedProject.description}
                </p>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-aarav-gold rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
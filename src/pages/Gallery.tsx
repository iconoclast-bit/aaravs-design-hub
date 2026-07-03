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
import { drive } from '@/assets/drive';

const projects = [
  {
    id: 1,
    title: 'Modern Minimalist Apartment',
    category: 'Residential',
    location: 'Mumbai, India',
    year: '2024',
    image: drive.d20,
    description: 'A sleek 1,200 sq ft apartment featuring clean lines, neutral tones, and smart storage solutions. The design maximizes natural light while maintaining a sophisticated urban aesthetic.',
    features: ['Open floor plan', 'Smart home integration', 'Custom built-ins', 'Premium finishes']
  },
  {
    id: 2,
    title: 'Contemporary Office Space',
    category: 'Commercial',
    location: 'Bengaluru, India',
    year: '2024',
    image: drive.d11,
    description: 'A tech company workspace designed to foster creativity and collaboration. Features flexible workstations, custom joinery, and acoustically tuned zones.',
    features: ['Flexible workstations', 'Custom joinery', 'Acoustic design', 'Warm task lighting']
  },
  {
    id: 3,
    title: 'Luxury Villa Living Room',
    category: 'Residential',
    location: 'Gurugram, India',
    year: '2023',
    image: drive.d13,
    description: 'Refined villa living and dining ensemble with sculptural lighting, layered textiles, and a curated art wall — a warm, ceremonial family space.',
    features: ['Statement chandelier', 'Custom console', 'Layered textiles', 'Curated art wall']
  },
  {
    id: 4,
    title: 'Boutique Hotel Foyer',
    category: 'Hospitality',
    location: 'Goa, India',
    year: '2023',
    image: drive.d5,
    description: 'Art Deco-inspired arrival experience with a sculpted staircase, marble flooring, and a bespoke dining vignette that anchors the lobby.',
    features: ['Sculpted staircase', 'Marble flooring', 'Bespoke dining vignette', 'Ambient cove lighting']
  },
  {
    id: 5,
    title: 'Urban Loft Living',
    category: 'Residential',
    location: 'Delhi, India',
    year: '2023',
    image: drive.d4,
    description: 'A generous open living zone with a slatted timber partition, deep lounge seating and a moody accent wall — cinematic yet livable.',
    features: ['Slatted timber partition', 'Deep lounge seating', 'Moody accent wall', 'Layered lighting']
  },
  {
    id: 6,
    title: 'Corporate Trophy Lounge',
    category: 'Commercial',
    location: 'Hyderabad, India',
    year: '2022',
    image: drive.d9,
    description: 'A brand-forward lounge with a custom display cabinet, saffron accent seating and a directional lighting scheme that frames every trophy and artefact.',
    features: ['Custom display cabinet', 'Accent lounge seating', 'Directional lighting', 'Brand-led palette']
  },
  {
    id: 7,
    title: 'Serene Entryway Retreat',
    category: 'Hospitality',
    location: 'Rishikesh, India',
    year: '2022',
    image: drive.d6,
    description: 'A calm arrival moment with a mirrored medallion, live planting and a hand-detailed console — set the tone for a restorative stay.',
    features: ['Mirrored medallion', 'Live planting', 'Hand-detailed console', 'Natural stone flooring']
  },
  {
    id: 8,
    title: 'Executive Master Suite',
    category: 'Residential',
    location: 'Pune, India',
    year: '2022',
    image: drive.d3,
    description: 'A hotel-inspired master bedroom featuring a tufted headboard, floral panelling and layered lighting for a restful, sophisticated retreat.',
    features: ['Tufted headboard wall', 'Custom panelling', 'Layered bedside lighting', 'Bespoke wardrobe']
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

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'Modern Minimalist Apartment',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Contemporary Office Space',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Luxury Villa Renovation',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    title: 'Boutique Hotel Lobby',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  }
];

const Gallery = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 relative">
              Featured Projects
              <span className="absolute -bottom-3 left-0 w-20 h-0.5 bg-aarav-gold"></span>
            </h2>
            <p className="max-w-xl text-lg text-aarav-gray-500 mt-6">
              Explore our portfolio of meticulously crafted spaces that showcase our design philosophy and attention to detail.
            </p>
          </div>
          <Link to="/gallery">
            <Button className="mt-6 md:mt-0 bg-aarav-black hover:bg-aarav-gold text-white">
              View Full Portfolio
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`image-grid-item ${index === 0 || index === 3 ? 'md:col-span-2' : ''}`}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-aarav-gold uppercase tracking-wider text-sm mb-1">{project.category}</span>
                <h3 className="text-white text-2xl font-serif">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

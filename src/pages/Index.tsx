
import Layout from '@/components/Layout';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Gallery from '@/components/home/Gallery';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </Layout>
  );
};

export default Index;

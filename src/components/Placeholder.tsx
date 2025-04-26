
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PlaceholderProps {
  title: string;
  subtitle?: string;
}

const Placeholder = ({ title, subtitle }: PlaceholderProps) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-aarav-gray-100 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-serif mb-4">{title}</h1>
      {subtitle && <p className="text-lg text-aarav-gray-500 mb-8 max-w-md">{subtitle}</p>}
      <Link to="/">
        <Button className="bg-aarav-black hover:bg-aarav-gold text-white">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default Placeholder;

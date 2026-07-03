import a1 from './a1.jpg.asset.json';
import a4 from './a4.jpg.asset.json';
import a5 from './a5.jpg.asset.json';
import livingArch from './living-arch.jpg.asset.json';
import livingDining from './living-dining.jpg.asset.json';
import office1 from './office-1.jpg.asset.json';
import office2 from './office-2.jpg.asset.json';

export const portfolio = {
  a1: a1.url,
  a4: a4.url,
  a5: a5.url,
  livingArch: livingArch.url,
  livingDining: livingDining.url,
  office1: office1.url,
  office2: office2.url,
};

export const galleryProjects = [
  { key: 'livingArch', title: 'Arched Mural Living Room', category: 'Residential', src: livingArch.url, span: 'md:col-span-7 md:row-span-2 aspect-[4/5]' },
  { key: 'office1', title: 'Corporate Lounge Suite', category: 'Commercial', src: office1.url, span: 'md:col-span-5 aspect-[4/3]' },
  { key: 'a1', title: 'Classical Penthouse Living', category: 'Residential', src: a1.url, span: 'md:col-span-5 aspect-[4/3]' },
  { key: 'a4', title: 'Sculpted Foyer Passage', category: 'Complete Build', src: a4.url, span: 'md:col-span-6 aspect-[3/4]' },
  { key: 'livingDining', title: 'Living & Dining Ensemble', category: 'Residential', src: livingDining.url, span: 'md:col-span-6 aspect-[3/4]' },
  { key: 'a5', title: 'Sunburst Entryway', category: 'Residential', src: a5.url, span: 'md:col-span-7 aspect-[16/10]' },
  { key: 'office2', title: 'Curated Display Wall', category: 'Commercial', src: office2.url, span: 'md:col-span-5 aspect-[4/5]' },
];

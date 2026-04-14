export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  ideal: string;
  image: string;
  suppliers?: { name: string; description?: string }[];
};

export const services: Service[] = [
  {
    id: 'laminate',
    name: 'Laminate Countertops',
    tagline: 'Versatile, durable, and beautifully affordable',
    description:
      "Laminate has come a long way. Today's options include highly realistic stone, marble, and wood patterns that deliver the look you want without the price tag of natural stone. Our laminate countertops are precision-fabricated for a clean, seamless fit and are available in hundreds of colors and textures from top manufacturers.",
    features: [
      'Hundreds of colors, patterns, and finishes',
      'Budget-friendly without sacrificing style',
      'Durable and easy to clean',
      'Available in matte, gloss, and textured surfaces',
      'Custom edge profiles available',
      'Quick turnaround time',
    ],
    ideal: 'Kitchens, rental properties, commercial spaces, and budget-conscious renovations.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
    suppliers: [
      { name: 'Wilsonart', description: 'Premium laminate surfaces with realistic stone, wood, and abstract patterns' },
      { name: 'Formica', description: 'Industry leader with 200+ textures and colors across multiple collections' },
    ],
  },
  {
    id: 'quartz',
    name: 'Quartz Countertops',
    tagline: 'The best of beauty and durability, engineered to impress',
    description:
      "Quartz countertops are engineered from natural quartz crystals bound with resins, creating a surface that is harder, more uniform, and virtually maintenance-free compared to natural stone. They resist scratches, stains, and bacteria without the need for sealing, making them one of the most practical premium countertop options available.",
    features: [
      'Non-porous: resists stains and bacteria',
      'No sealing required',
      'Scratch and chip resistant',
      'Consistent color and pattern throughout',
      'Available in hundreds of colors and designs',
      'Ideal for high-traffic kitchens',
    ],
    ideal: 'High-use kitchens, family homes, and anyone who wants a premium look with minimal maintenance.',
    image: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&q=80&auto=format&fit=crop',
    suppliers: [
      { name: 'MSI Surfaces', description: 'Extensive quartz collections including Calacatta, Carrara, and bold modern designs' },
      { name: 'Mont Surfaces', description: 'Premium quartz slabs with consistent patterning and rich color options' },
      { name: 'Laventa Quartz', description: 'Designer quartz with European-inspired aesthetics' },
      { name: 'Viatera', description: 'Premium engineered quartz surfaces built for longevity' },
    ],
  },
  {
    id: 'solid-surface',
    name: 'Solid Surface Countertops',
    tagline: 'Inconspicuous beauty with unmatched versatility',
    description:
      "Solid surface countertops (brands like Corian®) offer a unique advantage: inconspicuous integration. Because seams can be made virtually invisible and the material is completely uniform throughout, solid surface is the top choice for built-in sinks, curved designs, and complex custom shapes. They can also be repaired and refinished if scratched.",
    features: [
      'Inconspicuous joins and integrated sink options',
      'Completely repairable: scratches can be sanded out',
      'Non-porous and hygienic',
      'Ideal for complex custom shapes',
      'Wide range of colors and finishes',
      'Matte, satin, and high-gloss options',
    ],
    ideal: 'Custom kitchen designs, healthcare environments, and commercial applications.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
    suppliers: [
      { name: 'Corian', description: "DuPont's industry-defining solid surface with inconspicuous integration capabilities" },
      { name: 'HI-Macs', description: 'HI-MACS® solid surface offering thermoforming and inconspicuous fabrication' },
    ],
  },
  {
    id: 'granite',
    name: 'Granite Countertops',
    tagline: "Nature's masterpiece, permanently beautiful",
    description:
      "Granite is one of the hardest natural stones on earth, making it an ideal countertop material that withstands heat, scratches, and the test of time. Each granite slab is unique: no two are alike, giving your kitchen a one-of-a-kind natural work of art. Properly sealed and maintained, granite countertops will look stunning for decades.",
    features: [
      'Naturally heat resistant',
      'Each slab is a unique work of natural art',
      'Extremely hard and durable',
      'Adds significant resale value',
      'Available in hundreds of stone varieties',
      'Requires periodic sealing',
    ],
    ideal: 'Luxury kitchens, homeowners investing in long-term value, and lovers of natural stone.',
    image: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&q=80&auto=format&fit=crop',
    suppliers: [
      { name: 'MSI Surfaces', description: 'Vast inventory of natural granite slabs including Absolute Black and Azul Platino' },
      { name: 'Mont Surfaces', description: 'Premium granite warehouse with rare and exotic stone varieties' },
      { name: 'Omicron Granite', description: 'Natural stone supplier with an extensive regional slab inventory' },
    ],
  },
  {
    id: 'repair',
    name: 'Countertop Repair',
    tagline: "Restore, don't replace. Save thousands.",
    description:
      "Before spending thousands on full countertop replacement, call us for a repair consultation. Our technicians have repaired chips, cracks, burns, delamination, and water damage in laminate, solid surface, and stone countertops. A proper repair can restore both the appearance and function of your countertops at a fraction of the replacement cost.",
    features: [
      'Chip, crack, and burn repair',
      'Delamination re-bonding',
      'Surface refinishing and polishing',
      'Seam repair and re-joining',
      'Water damage restoration',
      'Honest assessment: we tell you when repair beats replacement',
    ],
    ideal: 'Homeowners with damaged countertops who want to save money without sacrificing quality.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
  },
];

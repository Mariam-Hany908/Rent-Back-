import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Designer suits, evening dresses, traditional attire, and seasonal outerwear.',
    iconName: 'Shirt',
    fieldDefinitions: [
      { name: 'brand', label: 'Brand / Designer', type: 'text', required: true, placeholder: 'e.g. Hugo Boss, Zimmerman' },
      { 
        name: 'clothingType', 
        label: 'Clothing Type', 
        type: 'select', 
        required: true, 
        options: ['Tuxedo / Suit', 'Evening Gown', 'Cocktail Dress', 'Winter Coat', 'Traditional / Occasion Wear', 'Accessories'] 
      },
      { 
        name: 'size', 
        label: 'Size', 
        type: 'select', 
        required: true, 
        options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom Tailored'] 
      },
      { name: 'color', label: 'Color', type: 'text', required: true, placeholder: 'e.g. Midnight Blue' },
      { name: 'material', label: 'Material', type: 'text', required: false, placeholder: 'e.g. 100% Wool, Silk Chiffon' }
    ]
  },
  {
    id: 'cat-cameras',
    name: 'Cameras & Photography',
    slug: 'cameras',
    description: 'Mirrorless bodies, cinema lenses, gimbals, lighting, and audio kits.',
    iconName: 'Camera',
    fieldDefinitions: [
      { name: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'e.g. Sony, Canon, Fujifilm, RED' },
      { name: 'model', label: 'Model', type: 'text', required: true, placeholder: 'e.g. Alpha 7 IV, EOS R5' },
      { 
        name: 'cameraType', 
        label: 'Camera / Gear Type', 
        type: 'select', 
        required: true, 
        options: ['Mirrorless Body', 'DSLR Body', 'Prime Lens', 'Zoom Lens', 'Gimbal / Stabilizer', 'Lighting Kit', 'Drone'] 
      },
      { name: 'specifications', label: 'Key Technical Specs', type: 'text', required: false, placeholder: 'e.g. 33MP Full-frame, 4K60p 10-bit 4:2:2' }
    ]
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Projectors, VR headsets, audio interfaces, consoles, and portable displays.',
    iconName: 'Cpu',
    fieldDefinitions: [
      { name: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'e.g. Apple, Sony, Anker, Bose' },
      { name: 'model', label: 'Model', type: 'text', required: true, placeholder: 'e.g. Nebula Capsule 3, Quest 3' },
      { 
        name: 'deviceType', 
        label: 'Device Type', 
        type: 'select', 
        required: true, 
        options: ['Portable Projector', 'VR / AR Headset', 'Audio Interface / Mixer', 'Gaming Console', 'Display Monitor', 'PA Speaker'] 
      },
      { name: 'specifications', label: 'Technical Specifications', type: 'text', required: false, placeholder: 'e.g. 1080p Laser, 300 ANSI Lumens, WiFi 6' }
    ]
  },
  {
    id: 'cat-tools',
    name: 'Tools & Equipment',
    slug: 'tools',
    description: 'Power tools, pressure washers, laser levels, thermal cameras, and drills.',
    iconName: 'Wrench',
    fieldDefinitions: [
      { name: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'e.g. DeWalt, Bosch, Milwaukee, Makita' },
      { name: 'model', label: 'Model', type: 'text', required: true, placeholder: 'e.g. DCD996 Hammer Drill' },
      { 
        name: 'toolType', 
        label: 'Tool / Equipment Type', 
        type: 'select', 
        required: true, 
        options: ['Cordless Power Tool', 'Pressure Washer', 'Laser Measure / Level', 'Thermal / Diagnostic Camera', 'Rotary Hammer', 'Generator'] 
      },
      { name: 'specifications', label: 'Power & Output Specs', type: 'text', required: false, placeholder: 'e.g. 20V MAX XR, 3-Speed, 2.0Ah & 5.0Ah batteries' }
    ]
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

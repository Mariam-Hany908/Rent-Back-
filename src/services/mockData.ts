import { 
  User, 
  Product, 
  RentalRequest, 
  Booking, 
  HandoverRecord, 
  Review, 
  Notification 
} from '../types';

export const MOCK_CURRENT_USER: User = {
  id: 'usr_current_01',
  name: 'Kareem Tarek',
  email: 'kareem.tarek@example.com',
  phone: '+20 100 123 4567',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'renter',
  activeRoleMode: 'renter',
  verificationStatus: 'verified',
  rating: 4.95,
  reviewCount: 18,
  memberSince: '2024-03-15'
};

export const MOCK_OWNER_USER: User = {
  id: 'usr_owner_02',
  name: 'Nour El-Din',
  email: 'nour.photo@example.com',
  phone: '+20 102 987 6543',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  role: 'owner',
  activeRoleMode: 'owner',
  verificationStatus: 'verified',
  rating: 4.88,
  reviewCount: 34,
  memberSince: '2023-11-10'
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_cam_01',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Sony Alpha 7 IV Full-Frame Camera + FE 24-70mm f/2.8 GM II Lens',
    category: 'cameras',
    categoryFields: {
      brand: 'Sony',
      model: 'Alpha 7 IV + 24-70mm GM II',
      cameraType: 'Mirrorless Body',
      specifications: '33MP BSI-CMOS, 4K60p 10-bit 4:2:2, Dual Card Slots'
    },
    description: 'Professional hybrid cinema & stills setup in mint condition. Ideal for commercial shoots, events, and indie filmmaking. Handled with extreme care.',
    condition: 'like_new',
    usageDuration: '8 months',
    specifications: {
      'Sensor': '33 Megapixels Full Frame',
      'Mount': 'Sony E-mount',
      'Video': '4K 60p 10-Bit 4:2:2 All-Intra',
      'Weight': '658g body only'
    },
    whatsIncluded: [
      'Sony A7 IV Camera Body with cap',
      'Sony FE 24-70mm f/2.8 GM II with hood and caps',
      '3x Original Sony NP-FZ100 batteries',
      'Dual rapid battery charger',
      '128GB SanDisk Extreme PRO V90 SDXC card',
      'Pelican protective travel case'
    ],
    declaredValue: 120000, // 120,000 EGP
    rentalPricePerDay: 1800, // 1,800 EGP / day
    securityDeposit: 60000, // 50% = 60,000 EGP
    media: [
      {
        id: 'med_01',
        url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true,
        tag: 'main',
        caption: 'Sony A7 IV Camera with GM Lens mounted'
      },
      {
        id: 'med_02',
        url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        tag: 'detailed',
        caption: 'Top control dials and sensor display'
      },
      {
        id: 'med_03',
        url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        tag: 'condition',
        caption: 'Glass surface inspection — pristine condition'
      },
      {
        id: 'med_04_vid',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: 'video',
        tag: 'functionality_demo',
        caption: 'Autofocus & 4K60p 10-bit live sensor video demonstration'
      }
    ],
    location: {
      city: 'Cairo',
      area: 'New Cairo (Fifth Settlement)',
      postalCode: '11835',
      pickupNotes: 'Rent Back representative handles secure pickup from owner hub'
    },
    rentalRules: [
      'Must use provided protective Pelican hard case during transport',
      'No underwater or extreme dusty/sandy environments without approved housing',
      'Return with clean sensor and all 3 charged batteries'
    ],
    status: 'active',
    rating: 4.96,
    reviewCount: 14,
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-05-10T14:30:00Z'
  },
  {
    id: 'prod_cloth_01',
    ownerId: 'usr_current_01',
    ownerName: 'Kareem Tarek',
    title: 'Hugo Boss Virgin Wool Black Tuxedo Set (Size 50 / L)',
    category: 'clothing',
    categoryFields: {
      brand: 'Hugo Boss',
      clothingType: 'Tuxedo / Suit',
      size: 'L',
      color: 'Midnight Black',
      material: '100% Italian Virgin Wool with Silk Satin Lapels'
    },
    description: 'Impeccably cut slim-fit tuxedo with silk satin shawl lapels and matching trousers with satin side stripes. Professionally dry-cleaned before and after every rental through Rent Back care.',
    condition: 'like_new',
    usageDuration: 'Worn 3 times',
    specifications: {
      'Jacket Size': 'EU 50 (US 40R)',
      'Trousers Inseam': '32 inches (unaltered hem)',
      'Fabric': 'Super 120s Virgin Wool',
      'Origin': 'Made in Italy'
    },
    whatsIncluded: [
      'Tuxedo Jacket (Shawl Lapel)',
      'Tuxedo Trousers',
      'Silk Satin Cummerbund',
      'Self-tie Silk Bowtie',
      'Breathable garment dust bag with wooden hanger'
    ],
    declaredValue: 36000, // 36,000 EGP
    rentalPricePerDay: 1200, // 1,200 EGP / day
    securityDeposit: 18000, // 50% = 18,000 EGP
    media: [
      {
        id: 'med_cloth_01',
        url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true,
        tag: 'main',
        caption: 'Front profile of Hugo Boss Tuxedo'
      },
      {
        id: 'med_cloth_02',
        url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        tag: 'detailed',
        caption: 'Silk satin lapel and button texture'
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Zamalek',
      postalCode: '11211',
      pickupNotes: 'Rent Back courier collects garment on hanger'
    },
    rentalRules: [
      'Do not attempt local home washing or pressing',
      'Rent Back provides certified professional dry cleaning between handovers',
      'Keep inside garment bag when not actively worn'
    ],
    status: 'active',
    rating: 5.0,
    reviewCount: 9,
    createdAt: '2024-03-20T12:00:00Z',
    updatedAt: '2024-04-18T09:15:00Z'
  },
  {
    id: 'prod_elec_01',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Anker Nebula Capsule 3 Laser 1080p Smart Portable Projector',
    category: 'electronics',
    categoryFields: {
      brand: 'Anker Nebula',
      model: 'Capsule 3 Laser',
      deviceType: 'Portable Projector',
      specifications: 'Laser 1080p, 300 ANSI Lumens, Google TV, 2.5h Battery'
    },
    description: 'Pocket-sized cinema powerhouse with laser brightness, auto autofocus, and auto keystone correction. Perfect for outdoor rooftop movie nights, pitch presentations, and staycations.',
    condition: 'brand_new',
    usageDuration: '2 months',
    specifications: {
      'Resolution': '1920 x 1080 (Full HD)',
      'Projection Size': 'Up to 120 inches',
      'Audio': '8W Dolby Digital Speaker',
      'Connectivity': 'HDMI, USB-C, AUX, Wi-Fi, Bluetooth'
    },
    whatsIncluded: [
      'Nebula Capsule 3 Laser Projector',
      'Smart Remote Control',
      '45W Power Delivery Charger with braided USB-C cable',
      'Compact adjustable desktop tripod',
      'Padded custom carry pouch'
    ],
    declaredValue: 28000, // 28,000 EGP
    rentalPricePerDay: 650, // 650 EGP / day
    securityDeposit: 14000, // 50% = 14,000 EGP
    media: [
      {
        id: 'med_elec_01',
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true,
        tag: 'main',
        caption: 'Nebula Capsule 3 Projector setup'
      },
      {
        id: 'med_elec_02',
        url: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        tag: 'detailed',
        caption: 'Projection brightness and color saturation in dim room'
      },
      {
        id: 'med_elec_vid',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: 'video',
        tag: 'functionality_demo',
        caption: 'Live auto-keystone and autofocus video demonstration'
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Maadi',
      postalCode: '11431',
      pickupNotes: 'Battery fully charged prior to handover'
    },
    rentalRules: [
      'Operate on stable, flat surfaces to avoid accidental drops',
      'Keep ventilation slots unobstructed while projection is on',
      'Do not expose to rain or high humidity'
    ],
    status: 'active',
    rating: 4.89,
    reviewCount: 22,
    createdAt: '2024-02-14T08:00:00Z',
    updatedAt: '2024-05-02T16:00:00Z'
  },
  {
    id: 'prod_tool_01',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'DeWalt 20V MAX XR Brushless 3-Speed Cordless Hammer Drill Kit',
    category: 'tools',
    categoryFields: {
      brand: 'DeWalt',
      model: 'DCD996P2 20V MAX XR',
      toolType: 'Cordless Power Tool',
      specifications: '820 UWO Power, 0-38,250 BPM, 3-speed all-metal transmission'
    },
    description: 'Heavy duty high-performance hammer drill capable of masonry, metal, and woodworking tasks. Comes complete with dual 5.0Ah high-capacity lithium battery packs and rapid charger.',
    condition: 'good',
    usageDuration: '1 year',
    specifications: {
      'Chuck Size': '1/2" Nitro-Carburized Metal Ratcheting',
      'Max BPM': '38,250 BPM',
      'Battery Capacity': '2x 5.0 Ah 20V XR Lithium-Ion',
      'Weight': '2.1 kg'
    },
    whatsIncluded: [
      'DeWalt DCD996 Hammer Drill Body',
      '360° Rotating side handle',
      '2x 20V MAX XR 5.0Ah Lithium Ion Batteries',
      'DeWalt DCB115 Multi-Voltage Charger',
      'DeWalt TSTAK Heavy Duty Tool Case'
    ],
    declaredValue: 22000, // 22,000 EGP
    rentalPricePerDay: 450, // 450 EGP / day
    securityDeposit: 11000, // 50% = 11,000 EGP
    media: [
      {
        id: 'med_tool_01',
        url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true,
        tag: 'main',
        caption: 'DeWalt cordless hammer drill and batteries'
      }
    ],
    location: {
      city: 'Giza',
      area: 'Sheikh Zayed City',
      postalCode: '12588',
      pickupNotes: 'Full tool test verified before dispatch'
    },
    rentalRules: [
      'Always wear safety glasses when operating tool',
      'Clean dust and debris from chuck prior to return',
      'Do not immerse in liquids or store in unventilated damp areas'
    ],
    status: 'active',
    rating: 4.92,
    reviewCount: 16,
    createdAt: '2024-01-10T11:00:00Z',
    updatedAt: '2024-04-12T13:40:00Z'
  },
  {
    id: 'prod_cam_02',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Canon EOS R5 C Cinema & Stills Full-Frame Mirrorless Camera',
    category: 'cameras',
    categoryFields: {
      brand: 'Canon',
      model: 'EOS R5 C',
      cameraType: 'Mirrorless Body',
      specifications: '45MP Full Frame, 8K60p Cinema RAW Light, Active Cooling'
    },
    description: 'Hybrid true cinema camera with internal 8K recording and uncropped 4K120p high frame rate. Features RF mount and full dual-pixel autofocus.',
    condition: 'brand_new',
    usageDuration: '1 month',
    specifications: {
      'Sensor': '45MP Full-Frame CMOS',
      'Video': '8K 60p RAW / 4K 120p 10-Bit',
      'Mount': 'Canon RF',
      'Audio': 'Dual XLR Adapter Compatible'
    },
    whatsIncluded: [
      'Canon EOS R5 C Body',
      '3x Canon LP-E6NH Batteries',
      'Dual Bay Charger',
      '512GB CFexpress Type B Card',
      'Card Reader and Cable',
      'Cage with Top Handle'
    ],
    declaredValue: 160000,
    rentalPricePerDay: 2500,
    securityDeposit: 80000,
    media: [
      {
        id: 'med_cam02_1',
        url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Zamalek',
      postalCode: '11211'
    },
    rentalRules: ['Use provided cage and card reader', 'No sand exposure'],
    status: 'active',
    rating: 5.0,
    reviewCount: 8,
    createdAt: '2024-04-15T09:00:00Z',
    updatedAt: '2024-05-12T10:00:00Z'
  },
  {
    id: 'prod_cam_03',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'DJI RS 3 Pro 3-Axis Gimbal Stabilizer Combo with LiDAR Focus',
    category: 'cameras',
    categoryFields: {
      brand: 'DJI',
      model: 'RS 3 Pro',
      cameraType: 'Gimbal / Stabilizer',
      specifications: '4.5kg Payload, Carbon Fiber Arms, Automated Axis Locks'
    },
    description: 'Industry standard camera stabilizer for cinema setups up to 4.5kg payload. Includes LiDAR range finder for manual cine lens autofocusing.',
    condition: 'like_new',
    usageDuration: '6 months',
    specifications: {
      'Tested Payload': '4.5 kg (10 lbs)',
      'Battery Runtime': 'Up to 12 hours',
      'Material': 'Layered Carbon Fiber'
    },
    whatsIncluded: [
      'DJI RS 3 Pro Gimbal',
      'BG30 Battery Grip',
      'Extended Grip / Tripod',
      'LiDAR Range Finder',
      'Focus Motor (2022)',
      'Carrying Case'
    ],
    declaredValue: 40000,
    rentalPricePerDay: 850,
    securityDeposit: 20000,
    media: [
      {
        id: 'med_cam03_1',
        url: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'New Cairo (Fifth Settlement)',
      postalCode: '11835'
    },
    rentalRules: ['Balance camera properly before turning on motor power'],
    status: 'active',
    rating: 4.86,
    reviewCount: 19,
    createdAt: '2024-03-01T14:00:00Z',
    updatedAt: '2024-04-20T12:00:00Z'
  },
  {
    id: 'prod_cam_04',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Sony FX3 Cinema Line Full-Frame Camera Cage Kit',
    category: 'cameras',
    categoryFields: {
      brand: 'Sony',
      model: 'FX3',
      cameraType: 'Mirrorless Body',
      specifications: '12.1MP Full Frame, S-Cinetone, Dual Base ISO 800/12800'
    },
    description: 'The preferred compact cinema camera for run-and-gun filmmakers and music videos. Unmatched low-light sensitivity with dual native ISO.',
    condition: 'brand_new',
    usageDuration: '3 months',
    specifications: {
      'Sensor': '12.1MP Exmor R BSI CMOS',
      'Video': '4K 120p 10-Bit 4:2:2 All-Intra',
      'Audio': 'Top Handle with Dual XLR inputs'
    },
    whatsIncluded: [
      'Sony FX3 Camera Body',
      'XLR Top Audio Handle',
      'Tilta Camera Cage',
      '4x NP-FZ100 Batteries + Quad Charger',
      '160GB CFexpress Type A Card'
    ],
    declaredValue: 180000,
    rentalPricePerDay: 2800,
    securityDeposit: 90000,
    media: [
      {
        id: 'med_cam04_1',
        url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Maadi',
      postalCode: '11431'
    },
    rentalRules: ['Must be transported in Pelican case'],
    status: 'active',
    rating: 4.98,
    reviewCount: 27,
    createdAt: '2024-02-20T11:00:00Z',
    updatedAt: '2024-05-08T15:00:00Z'
  },
  {
    id: 'prod_cam_05',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Canon RF 70-200mm f/2.8 L IS USM Telephoto Zoom Lens',
    category: 'cameras',
    categoryFields: {
      brand: 'Canon',
      model: 'RF 70-200mm f/2.8 L',
      cameraType: 'Zoom Lens',
      specifications: 'Compact telephoto zoom, 5-stop Image Stabilization, USM Dual Nano'
    },
    description: 'Remarkably compact and lightweight professional telephoto zoom lens with constant f/2.8 aperture. Razor-sharp contrast and fast autofocus.',
    condition: 'like_new',
    usageDuration: '7 months',
    specifications: {
      'Focal Length': '70-200mm',
      'Aperture': 'f/2.8 constant',
      'Filter Size': '77mm'
    },
    whatsIncluded: [
      'Lens Body with Tripod Collar',
      'Canon ET-83F Lens Hood',
      'Front & Rear Lens Caps',
      'Padded Lens Case'
    ],
    declaredValue: 95000,
    rentalPricePerDay: 1100,
    securityDeposit: 47500,
    media: [
      {
        id: 'med_cam05_1',
        url: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Heliopolis',
      postalCode: '11341'
    },
    rentalRules: ['Protective UV filter must remain attached at all times'],
    status: 'active',
    rating: 4.90,
    reviewCount: 11,
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-04-18T16:00:00Z'
  },
  {
    id: 'prod_cam_06',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'DJI Mavic 3 Pro Cine Drone with RC Pro Controller',
    category: 'cameras',
    categoryFields: {
      brand: 'DJI',
      model: 'Mavic 3 Pro Cine',
      cameraType: 'Drone',
      specifications: 'Triple Camera System, Apple ProRes 422 HQ, 1TB Internal SSD'
    },
    description: 'Flagship cinema drone with Hasselblad 4/3 CMOS main sensor and two dedicated telephoto lenses. Certified for professional commercial aerial footage.',
    condition: 'like_new',
    usageDuration: '5 months',
    specifications: {
      'Flight Time': 'Up to 43 minutes per battery',
      'Transmission': '15km O3+ Video Transmission',
      'Storage': 'Built-in 1TB SSD'
    },
    whatsIncluded: [
      'DJI Mavic 3 Pro Cine Drone',
      'DJI RC Pro Controller',
      '3x Intelligent Flight Batteries',
      'Battery Charging Hub',
      'ND Filter Set (ND8/16/32/64)',
      'Shoulder Storage Bag'
    ],
    declaredValue: 195000,
    rentalPricePerDay: 3200,
    securityDeposit: 97500,
    media: [
      {
        id: 'med_cam06_1',
        url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Giza',
      area: 'Sheikh Zayed City',
      postalCode: '12588'
    },
    rentalRules: ['Renter must hold valid civil drone permit', 'No flying near restricted airspace'],
    status: 'active',
    rating: 4.95,
    reviewCount: 15,
    createdAt: '2024-01-25T08:00:00Z',
    updatedAt: '2024-05-01T12:00:00Z'
  },
  {
    id: 'prod_cloth_02',
    ownerId: 'usr_current_01',
    ownerName: 'Kareem Tarek',
    title: 'Zimmermann High Tide Floral Lace Silk Midi Evening Dress (Size M)',
    category: 'clothing',
    categoryFields: {
      brand: 'Zimmermann',
      clothingType: 'Evening Gown',
      size: 'M',
      color: 'Ivory Floral',
      material: '100% Silk Linen Organza with Guipure Lace Trim'
    },
    description: 'Stunning runway dress featuring balloon sleeves, delicate pearl buttons, and sculpted corset bodice. Ideal for black-tie galas, weddings, and premium photoshoots.',
    condition: 'like_new',
    usageDuration: 'Worn 2 times',
    specifications: {
      'Dress Size': 'Zimmermann Size 2 (US 6-8 / Medium)',
      'Length': 'Midi length (approx. 125cm)',
      'Lining': 'Full 100% Cotton slip included'
    },
    whatsIncluded: [
      'Zimmermann High Tide Dress',
      'Removable matching woven belt with brass buckle',
      'Protective branded dust bag'
    ],
    declaredValue: 42000,
    rentalPricePerDay: 1900,
    securityDeposit: 21000,
    media: [
      {
        id: 'med_cloth02_1',
        url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'New Cairo (Fifth Settlement)',
      postalCode: '11835'
    },
    rentalRules: ['Professional dry-clean only handled by Rent Back', 'Avoid perfumes sprayed directly on lace'],
    status: 'active',
    rating: 4.94,
    reviewCount: 12,
    createdAt: '2024-03-05T13:00:00Z',
    updatedAt: '2024-04-28T09:00:00Z'
  },
  {
    id: 'prod_cloth_03',
    ownerId: 'usr_current_01',
    ownerName: 'Kareem Tarek',
    title: 'Tom Ford Velvet Shawl Lapel Cocktail Dinner Jacket (Size L / 52)',
    category: 'clothing',
    categoryFields: {
      brand: 'Tom Ford',
      clothingType: 'Tuxedo / Suit',
      size: 'L',
      color: 'Emerald Green',
      material: 'Cotton Velvet with Grosgrain Silk Lapels'
    },
    description: 'Iconic Tom Ford tailored dinner jacket in rich jewel-toned emerald green velvet. Features signature gauntlet cuffs and silk-covered buttons.',
    condition: 'brand_new',
    usageDuration: 'Never worn outdoors',
    specifications: {
      'Size': 'EU 52 / US 42R',
      'Shoulder Width': '46cm',
      'Origin': 'Handcrafted in Switzerland'
    },
    whatsIncluded: [
      'Tom Ford Velvet Dinner Jacket',
      'Tom Ford Hanger & Breathable Travel Cover'
    ],
    declaredValue: 60000,
    rentalPricePerDay: 2400,
    securityDeposit: 30000,
    media: [
      {
        id: 'med_cloth03_1',
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Zamalek',
      postalCode: '11211'
    },
    rentalRules: ['Rent Back inspects velvet pile upon return', 'Keep hung when not in use'],
    status: 'active',
    rating: 5.0,
    reviewCount: 7,
    createdAt: '2024-04-02T11:00:00Z',
    updatedAt: '2024-05-14T17:00:00Z'
  },
  {
    id: 'prod_cloth_04',
    ownerId: 'usr_current_01',
    ownerName: 'Kareem Tarek',
    title: 'Elie Saab Embellished Chiffon Gala Gown (Size S / 36)',
    category: 'clothing',
    categoryFields: {
      brand: 'Elie Saab',
      clothingType: 'Evening Gown',
      size: 'S',
      color: 'Royal Navy',
      material: 'Pure Silk Chiffon with Crystal & Sequin Beadwork'
    },
    description: 'Haute couture gala gown with intricate hand-embroidered floral motifs, plunging illusion neckline, and flowing silk chiffon cape train.',
    condition: 'like_new',
    usageDuration: 'Worn once for film festival premiere',
    specifications: {
      'Size': 'FR 36 / US 2-4 (Small)',
      'Bust': '84cm',
      'Waist': '66cm'
    },
    whatsIncluded: [
      'Elie Saab Gala Gown',
      'Integrated bodice bustier',
      'Luxury garment transport carrier'
    ],
    declaredValue: 85000,
    rentalPricePerDay: 3500,
    securityDeposit: 42500,
    media: [
      {
        id: 'med_cloth04_1',
        url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Giza',
      area: 'Dokki',
      postalCode: '12311'
    },
    rentalRules: ['Careful handling of beadwork', 'No safety pins or alterations allowed'],
    status: 'active',
    rating: 4.97,
    reviewCount: 6,
    createdAt: '2024-02-18T10:00:00Z',
    updatedAt: '2024-04-22T14:00:00Z'
  },
  {
    id: 'prod_cloth_05',
    ownerId: 'usr_current_01',
    ownerName: 'Kareem Tarek',
    title: 'Burberry Sandringham Heritage Long Cotton Gabardine Trench Coat',
    category: 'clothing',
    categoryFields: {
      brand: 'Burberry',
      clothingType: 'Winter Coat',
      size: 'XL',
      color: 'Honey Beige',
      material: '100% Weatherproof Cotton Gabardine'
    },
    description: 'The definitive British classic trench coat made from weatherproof cotton gabardine invented by Thomas Burberry. Features vintage check undercollar.',
    condition: 'good',
    usageDuration: '1 year',
    specifications: {
      'Size': 'UK 42 / EU 52 (XL)',
      'Closure': 'Double-breasted horn button closure',
      'Length': '105cm'
    },
    whatsIncluded: [
      'Burberry Heritage Trench Coat',
      'Matching Gabardine Belt with D-rings',
      'Storm Collar Latch'
    ],
    declaredValue: 35000,
    rentalPricePerDay: 1400,
    securityDeposit: 17500,
    media: [
      {
        id: 'med_cloth05_1',
        url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Maadi',
      postalCode: '11431'
    },
    rentalRules: ['Do not machine wash or steam heavily'],
    status: 'active',
    rating: 4.88,
    reviewCount: 14,
    createdAt: '2024-01-15T15:00:00Z',
    updatedAt: '2024-03-30T11:00:00Z'
  },
  {
    id: 'prod_elec_02',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Meta Quest 3 512GB Breakthrough Mixed Reality Headset Bundle',
    category: 'electronics',
    categoryFields: {
      brand: 'Meta',
      model: 'Quest 3',
      deviceType: 'VR / AR Headset',
      specifications: '4K+ Infinite Display, Snapdragon XR2 Gen 2, Color Passthrough'
    },
    description: 'Experience next-generation virtual and mixed reality. Full color high-resolution passthrough lets you blend virtual elements into your physical room.',
    condition: 'brand_new',
    usageDuration: '1 month',
    specifications: {
      'Storage': '512GB High-speed SSD',
      'Resolution': '2064x2208 pixels per eye',
      'Refresh Rate': 'Up to 120Hz'
    },
    whatsIncluded: [
      'Meta Quest 3 Headset with silicone face cover',
      '2x Touch Plus Controllers with wrist lanyards',
      'Elite Strap with Extended Battery Pack',
      'Link High-Speed Fiber Optic 5m Cable',
      'Hard Protective Travel Case'
    ],
    declaredValue: 32000,
    rentalPricePerDay: 550,
    securityDeposit: 16000,
    media: [
      {
        id: 'med_elec02_1',
        url: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Nasr City',
      postalCode: '11765'
    },
    rentalRules: ['Avoid exposing optical lenses to direct sunlight to prevent screen burns'],
    status: 'active',
    rating: 4.82,
    reviewCount: 20,
    createdAt: '2024-03-10T12:00:00Z',
    updatedAt: '2024-05-04T18:00:00Z'
  },
  {
    id: 'prod_elec_03',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Bose S1 Pro+ All-in-One Wireless Portable Bluetooth PA Speaker',
    category: 'electronics',
    categoryFields: {
      brand: 'Bose',
      model: 'S1 Pro+',
      deviceType: 'PA Speaker',
      specifications: 'Integrated 3-channel mixer, 11-hour battery, OLED displays'
    },
    description: 'The ultimate portable sound system for corporate events, acoustic performances, parties, and weddings. Wireless RF transmitters eliminate cable clutter.',
    condition: 'like_new',
    usageDuration: '4 months',
    specifications: {
      'Weight': '6.5 kg',
      'Battery Life': 'Up to 11 hours playing time',
      'Wireless': 'Bluetooth 5.0 + Wireless RF Receivers'
    },
    whatsIncluded: [
      'Bose S1 Pro+ Speaker Unit',
      'Rechargeable Lithium-ion Battery',
      'Bose Wireless Mic/Line RF Transmitter',
      'Speaker Stand Mount Adapter',
      'Padded Slip Cover'
    ],
    declaredValue: 36000,
    rentalPricePerDay: 750,
    securityDeposit: 18000,
    media: [
      {
        id: 'med_elec03_1',
        url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'New Cairo (Fifth Settlement)',
      postalCode: '11835'
    },
    rentalRules: ['Avoid operating in direct rain or sandy areas'],
    status: 'active',
    rating: 4.91,
    reviewCount: 17,
    createdAt: '2024-02-05T14:00:00Z',
    updatedAt: '2024-04-10T16:00:00Z'
  },
  {
    id: 'prod_elec_04',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Apple Studio Display 27-inch 5K Retina Professional Monitor',
    category: 'electronics',
    categoryFields: {
      brand: 'Apple',
      model: 'Studio Display',
      deviceType: 'Display Monitor',
      specifications: '5120x2880 5K, 600 nits brightness, 12MP Center Stage Camera'
    },
    description: 'Massive 27-inch 5K Retina display with studio-quality three-mic array and six-speaker sound system with Spatial Audio. Perfect for color-critical video and photo editing.',
    condition: 'like_new',
    usageDuration: '6 months',
    specifications: {
      'Panel': '27-inch 5K Retina (5120x2880)',
      'Brightness': '600 nits, P3 wide color',
      'Port': 'Thunderbolt 3 (with 96W host charging)'
    },
    whatsIncluded: [
      'Apple Studio Display with Tilt-Adjustable Stand',
      'Thunderbolt 3 Pro Cable (1m)',
      'Original Protective Box with Foam Padding'
    ],
    declaredValue: 90000,
    rentalPricePerDay: 1600,
    securityDeposit: 45000,
    media: [
      {
        id: 'med_elec04_1',
        url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Zamalek',
      postalCode: '11211'
    },
    rentalRules: ['Must be transported in factory fitted padded box'],
    status: 'active',
    rating: 4.89,
    reviewCount: 9,
    createdAt: '2024-03-25T11:00:00Z',
    updatedAt: '2024-05-02T13:00:00Z'
  },
  {
    id: 'prod_tool_02',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Bosch Professional GRL 300 HV Self-Leveling Rotary Laser Level Kit',
    category: 'tools',
    categoryFields: {
      brand: 'Bosch',
      model: 'GRL 300 HV',
      toolType: 'Laser Measure / Level',
      specifications: '300m working diameter, ±0.1 mm/m accuracy, IP54 dust protection'
    },
    description: 'High-precision rotary laser for indoor and outdoor leveling, alignment, and squaring. Features 90-degree plumb beam and shock-warning function.',
    condition: 'good',
    usageDuration: '10 months',
    specifications: {
      'Range with Receiver': 'Up to 300m diameter',
      'Laser Diode': '635 nm, < 5 mW',
      'Self-leveling range': '± 5° (8%)'
    },
    whatsIncluded: [
      'Rotary Laser Level GRL 300 HV',
      'Laser Receiver LR 1 Professional with bracket',
      'RC 1 Remote Control',
      'Building Tripod BT 300 HD',
      'Measuring Rod GR 240',
      'Heavy Duty Carrying Case'
    ],
    declaredValue: 38000,
    rentalPricePerDay: 600,
    securityDeposit: 19000,
    media: [
      {
        id: 'med_tool02_1',
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Cairo',
      area: 'Heliopolis',
      postalCode: '11341'
    },
    rentalRules: ['Do not expose optical laser prism to impacts or chemicals'],
    status: 'active',
    rating: 4.78,
    reviewCount: 13,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-04-05T15:00:00Z'
  },
  {
    id: 'prod_tool_03',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Kärcher K7 Premium Smart Control 180-Bar Pressure Washer',
    category: 'tools',
    categoryFields: {
      brand: 'Kärcher',
      model: 'K7 Premium',
      toolType: 'Pressure Washer',
      specifications: '180 Bar max pressure, 600 l/h water flow, Bluetooth boost mode'
    },
    description: 'Top-of-the-line electric pressure washer with Bluetooth app guidance, 3-in-1 Multi Jet lance, and Plug "n" Clean detergent application system.',
    condition: 'like_new',
    usageDuration: '4 months',
    specifications: {
      'Max Pressure': '180 Bar (2600 PSI)',
      'Motor': 'Water-cooled induction motor 3000W',
      'Hose Length': '10 meters high pressure steel-reinforced'
    },
    whatsIncluded: [
      'K7 Premium Pressure Washer Unit with Hose Reel',
      'G 180 Q Smart Control Trigger Gun',
      '3-in-1 Multi Jet Spray Lance',
      'T 7 Plus Surface Cleaner attachment for driveways'
    ],
    declaredValue: 32000,
    rentalPricePerDay: 700,
    securityDeposit: 16000,
    media: [
      {
        id: 'med_tool03_1',
        url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Giza',
      area: 'Sheikh Zayed City',
      postalCode: '12588'
    },
    rentalRules: ['Ensure constant clean water supply before engaging motor to avoid pump cavitation'],
    status: 'active',
    rating: 4.86,
    reviewCount: 18,
    createdAt: '2024-02-12T14:00:00Z',
    updatedAt: '2024-04-25T11:00:00Z'
  },
  {
    id: 'prod_tool_04',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    title: 'Milwaukee M18 FUEL Deep Cut Dual-Trigger Portable Band Saw Kit',
    category: 'tools',
    categoryFields: {
      brand: 'Milwaukee',
      model: 'M18 FUEL Band Saw',
      toolType: 'Cordless Power Tool',
      specifications: '5" x 5" cutting capacity, POWERSTATE brushless motor, Dual-trigger safety'
    },
    description: 'Heavy duty metal and conduit cutting cordless band saw. Dual-trigger design requires two hands to operate for maximum on-site job compliance.',
    condition: 'fair',
    usageDuration: '1.5 years',
    specifications: {
      'Cut Capacity': '127mm x 127mm',
      'Speed': '0 - 116 m/min variable',
      'Battery': '2x M18 REDLITHIUM High Output 6.0Ah'
    },
    whatsIncluded: [
      'Milwaukee Deep Cut Band Saw',
      '2x M18 REDLITHIUM 6.0Ah Battery Packs',
      'M12/M18 Rapid Multi-voltage Charger',
      '3x Bi-Metal Cutting Blades (14/18 TPI)',
      'Heavy Duty Tool Bag'
    ],
    declaredValue: 26000,
    rentalPricePerDay: 500,
    securityDeposit: 13000,
    media: [
      {
        id: 'med_tool04_1',
        url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&auto=format&fit=crop&q=80',
        type: 'image',
        isMain: true
      }
    ],
    location: {
      city: 'Giza',
      area: '6th of October City',
      postalCode: '12566'
    },
    rentalRules: ['Wear leather work gloves and safety glasses during operation'],
    status: 'active',
    rating: 4.75,
    reviewCount: 10,
    createdAt: '2023-11-10T10:00:00Z',
    updatedAt: '2024-03-20T12:00:00Z'
  }
];

export const MOCK_RENTAL_REQUESTS: RentalRequest[] = [
  {
    id: 'req_001',
    productId: 'prod_cam_01',
    productTitle: 'Sony Alpha 7 IV Full-Frame Camera + FE 24-70mm f/2.8 GM II Lens',
    productMainImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80',
    renterId: 'usr_current_01',
    renterName: 'Kareem Tarek',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    startDate: '2026-10-01',
    returnDate: '2026-10-04',
    totalDays: 3,
    rentalFeePerDay: 1800,
    totalRentalFee: 5400,
    platformCommission: 540, // 10%
    securityDeposit: 60000, // 50% of 120,000 EGP
    totalPayableAmount: 65400,
    status: 'deposit_required',
    heldUntil: '2026-09-22T18:00:00Z',
    createdAt: '2026-09-20T08:00:00Z',
    updatedAt: '2026-09-20T08:10:00Z'
  },
  {
    id: 'req_002',
    productId: 'prod_elec_01',
    productTitle: 'Anker Nebula Capsule 3 Laser 1080p Smart Portable Projector',
    productMainImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80',
    renterId: 'usr_current_01',
    renterName: 'Kareem Tarek',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    startDate: '2026-10-15',
    returnDate: '2026-10-17',
    totalDays: 2,
    rentalFeePerDay: 650,
    totalRentalFee: 1300,
    platformCommission: 130,
    securityDeposit: 14000, // 50% of 28,000 EGP
    totalPayableAmount: 15300,
    status: 'pending',
    heldUntil: '2026-09-21T08:00:00Z',
    createdAt: '2026-09-20T07:30:00Z',
    updatedAt: '2026-09-20T07:30:00Z'
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'book_101',
    requestId: 'req_prev_09',
    productId: 'prod_cloth_01',
    productTitle: 'Hugo Boss Virgin Wool Black Tuxedo Set (Size 50 / L)',
    productMainImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&auto=format&fit=crop&q=80',
    renterId: 'usr_current_01',
    renterName: 'Kareem Tarek',
    ownerId: 'usr_owner_02',
    ownerName: 'Nour El-Din',
    startDate: '2026-08-10',
    returnDate: '2026-08-12',
    totalDays: 2,
    totalRentalFee: 2400,
    platformCommission: 240,
    securityDeposit: 18000,
    depositStatus: 'refunded',
    depositPaidAt: '2026-08-05T10:00:00Z',
    bookingStatus: 'completed',
    createdAt: '2026-08-05T09:00:00Z'
  }
];

export const MOCK_HANDOVERS: HandoverRecord[] = [
  {
    id: 'hnd_01',
    bookingId: 'book_101',
    step: 'owner_to_rentback',
    scheduledDate: '2026-08-09T14:00:00Z',
    status: 'completed',
    inspectedCondition: 'Garment dry-cleaned, no stains or pulled threads verified by Rent Back hub inspector.',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80'
    ],
    notes: 'Handover verified and signed off at Rent Back Central Cairo Hub.',
    confirmedByOwner: true,
    timestamp: '2026-08-09T14:35:00Z'
  },
  {
    id: 'hnd_02',
    bookingId: 'book_101',
    step: 'rentback_to_renter',
    scheduledDate: '2026-08-10T09:00:00Z',
    status: 'completed',
    inspectedCondition: 'Delivered in Rent Back signature protected garment bag.',
    evidencePhotos: [],
    notes: 'Renter inspected garment upon delivery and confirmed flawless state.',
    confirmedByRenter: true,
    timestamp: '2026-08-10T09:40:00Z'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_01',
    bookingId: 'book_101',
    productId: 'prod_cloth_01',
    authorId: 'usr_current_01',
    authorName: 'Kareem Tarek',
    authorRole: 'renter',
    rating: 5,
    comment: 'The suit was in immaculate showroom condition. Rent Back handover was punctual, smooth, and the return was completely hassle-free.',
    createdAt: '2026-08-13T11:00:00Z'
  },
  {
    id: 'rev_01b',
    bookingId: 'book_prev_02',
    productId: 'prod_cloth_01',
    authorId: 'usr_prev_07',
    authorName: 'Omar Samy',
    authorRole: 'renter',
    rating: 5,
    comment: 'Rented for my brother’s wedding. Perfect fit, crisp fabric, and the Rent Back garment bag kept it pristine.',
    createdAt: '2026-07-05T14:30:00Z'
  },
  {
    id: 'rev_02',
    bookingId: 'book_prev_04',
    productId: 'prod_cam_01',
    authorId: 'usr_prev_03',
    authorName: 'Sherif Fathy',
    authorRole: 'renter',
    rating: 5,
    comment: 'Top tier gear! Clean sensor, long battery life, and the GM II lens was razor sharp.',
    createdAt: '2026-07-20T16:20:00Z'
  },
  {
    id: 'rev_02b',
    bookingId: 'book_prev_08',
    productId: 'prod_cam_01',
    authorId: 'usr_prev_09',
    authorName: 'Dina Mostafa',
    authorRole: 'renter',
    rating: 5,
    comment: 'Camera kit had all 3 batteries fully charged, clean Pelican case, and memory card ready. Handled a 3-day commercial shoot without a hitch.',
    createdAt: '2026-06-15T18:00:00Z'
  },
  {
    id: 'rev_02c',
    bookingId: 'book_prev_10',
    productId: 'prod_cam_01',
    authorId: 'usr_prev_11',
    authorName: 'Youssef Radi',
    authorRole: 'renter',
    rating: 4,
    comment: 'Incredible setup. Autofocus tracking was flawless. Escrow deposit return took less than 24 hours after return inspection.',
    createdAt: '2026-05-22T10:15:00Z'
  },
  {
    id: 'rev_03',
    bookingId: 'book_prev_05',
    productId: 'prod_elec_01',
    authorId: 'usr_prev_04',
    authorName: 'Layla Mansour',
    authorRole: 'renter',
    rating: 5,
    comment: 'The portable laser projector turned our outdoor family gathering into a cinema night. Rent Back verified everything before handover.',
    createdAt: '2026-07-28T19:40:00Z'
  },
  {
    id: 'rev_03b',
    bookingId: 'book_prev_12',
    productId: 'prod_elec_01',
    authorId: 'usr_prev_13',
    authorName: 'Ahmed Helmy',
    authorRole: 'renter',
    rating: 5,
    comment: 'Super easy setup with the included tripod and Google TV interface. Crisp image even at 100 inches.',
    createdAt: '2026-06-30T21:00:00Z'
  },
  {
    id: 'rev_04',
    bookingId: 'book_prev_06',
    productId: 'prod_tool_01',
    authorId: 'usr_owner_02',
    authorName: 'Nour El-Din',
    authorRole: 'owner',
    rating: 5,
    comment: 'Rented out my DeWalt hammer drill kit twice this month. The 50% escrow deposit gave me peace of mind, and Rent Back handled the return smoothly.',
    createdAt: '2026-08-01T14:15:00Z'
  },
  {
    id: 'rev_04b',
    bookingId: 'book_prev_14',
    productId: 'prod_tool_01',
    authorId: 'usr_prev_15',
    authorName: 'Mahmoud Hassan',
    authorRole: 'renter',
    rating: 5,
    comment: 'Powerful tool, punched through solid concrete with zero hesitation. Dual batteries lasted all day.',
    createdAt: '2026-07-12T16:45:00Z'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_01',
    userId: 'usr_current_01',
    title: 'Rental Request Approved',
    message: 'Your request for Sony Alpha 7 IV has been approved. Please pay the security deposit to confirm your booking.',
    type: 'request',
    isRead: false,
    createdAt: '2026-09-20T08:10:00Z',
    actionUrl: '/user/rentals'
  },
  {
    id: 'notif_02',
    userId: 'usr_current_01',
    title: 'Listing Status Update',
    message: 'Your listing "Hugo Boss Virgin Wool Black Tuxedo Set" is active and visible to renters.',
    type: 'success',
    isRead: true,
    createdAt: '2026-09-19T15:00:00Z',
    actionUrl: '/owner/listings'
  }
];

import type { Property, Service, Testimonial, Notification, FAQ } from './types';
import { InteriorCategory } from './types';
import { HomeIcon, BuildingOffice2Icon, PaintBrushIcon, WrenchScrewdriverIcon, SparklesIcon, SunIcon, MoonIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';


export const PROPERTIES: Property[] = [
  // BIDHAN NAGAR AREA
  {
    id: 'bn1',
    title: 'Affordable 3BHK Bungalow',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'CHRISTANPALLY, Near Suchana Complex',
    type: '3BHK',
    style: 'Normal',
    size: 1200,
    price: '₹24,99,000',
    priceValue: 24.99,
    description: 'A practical and affordable 3BHK home spanning 1200 sq. ft. Located conveniently in Christanpally near Suchana Complex, it offers a great balance of space and value. Perfect for first-time homebuyers or small families.',
    images: ['https://picsum.photos/seed/bn1a/800/600', 'https://picsum.photos/seed/bn1b/800/600', 'https://picsum.photos/seed/bn1c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn1/800/600'
  },
  {
    id: 'bn2',
    title: 'Luxury 3BHK Residence',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'CHRISTANPALLY, Near Suchana Complex',
    type: '3BHK',
    style: 'Luxury',
    size: 1400,
    price: '₹26,99,000',
    priceValue: 26.99,
    description: 'Experience enhanced living in this 1400 sq. ft. luxury 3BHK bungalow. Situated near Suchana Complex in Christanpally, this home features premium finishes and thoughtful design for a comfortable lifestyle.',
    images: ['https://picsum.photos/seed/bn2a/800/600', 'https://picsum.photos/seed/bn2b/800/600', 'https://picsum.photos/seed/bn2c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn2/800/600'
  },
  {
    id: 'bn3',
    title: 'Spacious 4BHK Duplex',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'CHRISTANPALLY, Near Suchana Complex',
    type: '4BHK',
    style: 'Duplex',
    size: 1500,
    price: '₹27,99,000',
    priceValue: 27.99,
    description: 'This 1500 sq. ft. 4BHK Duplex offers ample space for a growing family. Located in the desirable area of Christanpally near Suchana Complex, it combines modern architecture with functional living spaces.',
    images: ['https://picsum.photos/seed/bn3a/800/600', 'https://picsum.photos/seed/bn3b/800/600', 'https://picsum.photos/seed/bn3c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn3/800/600'
  },
  {
    id: 'bn4',
    title: 'Prime Location 3BHK',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'CHRISTANPALLY, More Near to Road',
    type: '3BHK',
    style: 'Normal',
    size: 1300,
    price: '₹34,99,000',
    priceValue: 34.99,
    description: 'A well-appointed 1300 sq. ft. 3BHK bungalow in a prime Christanpally location with excellent road access. This home is perfect for those who value convenience and connectivity.',
    images: ['https://picsum.photos/seed/bn4a/800/600', 'https://picsum.photos/seed/bn4b/800/600', 'https://picsum.photos/seed/bn4c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn4/800/600'
  },
  {
    id: 'bn5',
    title: 'Charming 3BHK in Fuljhore',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'FULZHORE',
    type: '3BHK',
    style: 'Normal',
    size: 1200,
    price: '₹33,00,000',
    priceValue: 33.00,
    description: 'Discover this charming 1200 sq. ft. 3BHK home in the serene locality of Fuljhore. It offers a peaceful retreat with all modern amenities, making it a perfect family home.',
    images: ['https://picsum.photos/seed/bn5a/800/600', 'https://picsum.photos/seed/bn5b/800/600', 'https://picsum.photos/seed/bn5c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn5/800/600'
  },
  {
    id: 'bn6',
    title: 'Fuljhore Luxury 3BHK',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'FULZHORE',
    type: '3BHK',
    style: 'Luxury',
    size: 1400,
    price: '₹34,49,000',
    priceValue: 34.49,
    description: 'Indulge in luxury with this 1400 sq. ft. 3BHK residence in Fuljhore. Featuring high-end fittings and a superior design, this home is crafted for those with a taste for the finer things in life.',
    images: ['https://picsum.photos/seed/bn6a/800/600', 'https://picsum.photos/seed/bn6b/800/600', 'https://picsum.photos/seed/bn6c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn6/800/600'
  },
  {
    id: 'bn7',
    title: 'Fuljhore 4BHK Duplex',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'FULZHORE',
    type: '4BHK',
    style: 'Duplex',
    size: 1500,
    price: '₹35,49,000',
    priceValue: 35.49,
    description: 'A beautifully designed 1500 sq. ft. 4BHK Duplex in Fuljhore. With its spacious layout and modern aesthetics, it provides an ideal environment for family living and entertaining.',
    images: ['https://picsum.photos/seed/bn7a/800/600', 'https://picsum.photos/seed/bn7b/800/600', 'https://picsum.photos/seed/bn7c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn7/800/600'
  },
  {
    id: 'bn8',
    title: '3BHK at Saptarshi Park Down',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'SAPTARSHI PARK DOWN AREA',
    type: '3BHK',
    style: 'Normal',
    size: 1400,
    landArea: '1.7 Kattha',
    price: '₹30,49,000',
    priceValue: 30.49,
    description: 'This 1400 sq. ft. 3BHK home is situated on a 1.7 Kattha plot in the Saptarshi Park Down area. It offers a generous living space and a sizable land area, perfect for outdoor activities.',
    images: ['https://picsum.photos/seed/bn8a/800/600', 'https://picsum.photos/seed/bn8b/800/600', 'https://picsum.photos/seed/bn8c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn8/800/600'
  },
  {
    id: 'bn9',
    title: 'Premium Duplex at Saptarshi Park',
    mainArea: 'BIDHAN NAGAR AREA',
    subLocation: 'SAPTARSHI PARK',
    type: '4BHK',
    style: 'Duplex',
    size: 1500,
    landArea: '2.5 Kattha',
    price: '₹49,00,000',
    priceValue: 49.00,
    description: 'An exclusive 1500 sq. ft. 4BHK Duplex in the prestigious Saptarshi Park. Set on a 2.5 Kattha plot, this property offers luxury, space, and a prime address.',
    images: ['https://picsum.photos/seed/bn9a/800/600', 'https://picsum.photos/seed/bn9b/800/600', 'https://picsum.photos/seed/bn9c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpbn9/800/600'
  },
  // DURGAPUR -01 AREA
  {
    id: 'd1',
    title: 'Elegant Duplex at Shyampur',
    mainArea: 'DURGAPUR -01 AREA',
    subLocation: 'Shyampur – Rabindrapally',
    type: '4BHK',
    style: 'Duplex',
    size: 1500,
    landArea: '2.78 Kattha',
    price: '₹55,00,000',
    priceValue: 55.00,
    description: 'A stunning 1500 sq. ft. 4BHK Duplex on a 2.78 Kattha plot in Shyampur – Rabindrapally. This home combines elegant design with a spacious layout for a truly premium living experience.',
    images: ['https://picsum.photos/seed/d1a/800/600', 'https://picsum.photos/seed/d1b/800/600', 'https://picsum.photos/seed/d1c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpd1/800/600'
  },
  {
    id: 'd2',
    title: 'Grand Duplex at Dakshinayan',
    mainArea: 'DURGAPUR -01 AREA',
    subLocation: 'Dakshinayan',
    type: '4BHK',
    style: 'Duplex',
    size: 1500,
    landArea: '3 Kattha',
    price: '₹55,00,000',
    priceValue: 55.00,
    description: 'This grand 1500 sq. ft. 4BHK Duplex is set on a large 3 Kattha plot in Dakshinayan. It offers expansive living spaces, both indoors and out, perfect for those seeking luxury and privacy.',
    images: ['https://picsum.photos/seed/d2a/800/600', 'https://picsum.photos/seed/d2b/800/600', 'https://picsum.photos/seed/d2c/800/600'],
    floorPlan: 'https://picsum.photos/seed/fpd2/800/600'
  }
];

export const CONSTRUCTION_SERVICES: Service[] = [
  {
    title: 'New Bungalows',
    description: 'End-to-end construction of premium bungalows, from foundation to finishing, tailored to your vision.',
    icon: HomeIcon
  },
  {
    title: 'Duplex/Triplex Construction',
    description: 'Specializing in multi-level luxury homes with modern architectural designs and robust engineering.',
    icon: BuildingOffice2Icon
  },
  {
    title: 'Renovation Services',
    description: 'Transform your existing space with our expert renovation and remodeling solutions.',
    icon: WrenchScrewdriverIcon
  },
  {
    title: 'Custom Construction',
    description: 'Have a unique plan? We bring your custom architectural dreams to life with precision and quality.',
    icon: PaintBrushIcon
  }
];

export const INTERIOR_DESIGN_GALLERY = {
    [InteriorCategory.LivingRoom]: [
        'https://picsum.photos/seed/lr1/800/600',
        'https://picsum.photos/seed/lr2/800/600',
        'https://picsum.photos/seed/lr3/800/600',
    ],
    [InteriorCategory.Bedroom]: [
        'https://picsum.photos/seed/br1/800/600',
        'https://picsum.photos/seed/br2/800/600',
        'https://picsum.photos/seed/br3/800/600',
    ],
    [InteriorCategory.Kitchen]: [
        'https://picsum.photos/seed/kt1/800/600',
        'https://picsum.photos/seed/kt2/800/600',
        'https://picsum.photos/seed/kt3/800/600',
    ],
    [InteriorCategory.Bathroom]: [
        'https://picsum.photos/seed/bt1/800/600',
        'https://picsum.photos/seed/bt2/800/600',
        'https://picsum.photos/seed/bt3/800/600',
    ]
}


export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Masuvo Infracon delivered our dream home on time without compromising on quality. The team was professional and transparent throughout the process.",
    author: "R. & S. Sharma",
    project: "4BHK Duplex, Christianpally"
  },
  {
    quote: "The attention to detail in both construction and interiors by Trayaksh is exceptional. Highly recommended for anyone looking for a premium experience.",
    author: "A. Gupta",
    project: "5BHK Triplex, Fuljhore"
  }
];

export const PROJECT_NOTIFICATIONS: Notification[] = [
  { 
    id: 'n3', 
    message: 'Kitchen countertop installation is complete.', 
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), 
    read: true 
  },
  { 
    id: 'n2', 
    message: 'Your next payment invoice has been generated.', 
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
    read: false 
  },
  { 
    id: 'n1', 
    message: 'Exterior painting has begun. Photos have been uploaded to the gallery.', 
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
    read: false 
  },
];

export const FAQS: FAQ[] = [
  {
    question: "What is the typical timeline for building a new bungalow?",
    answer: "The construction timeline can vary depending on the size and complexity of the project. On average, a new bungalow construction takes between 10 to 14 months from foundation to handover."
  },
  {
    question: "What is your payment structure?",
    answer: "We follow a milestone-based payment structure. Payments are due upon completion of specific stages of the project, such as foundation, structure, finishing, etc. A detailed schedule will be provided in your contract."
  },
  {
    question: "Can I customize the floor plans for the properties listed?",
    answer: "Absolutely. We encourage customization to ensure your new home perfectly fits your needs. Our architects will work with you to modify existing plans or create a completely new design."
  },
  {
    question: "Do you offer standalone interior design services through Trayaksh Interior?",
    answer: "Yes, Trayaksh Interior offers comprehensive interior design services independently of our construction projects. This includes consultation, space planning, furniture selection, and complete turnkey interior solutions."
  },
  {
    question: "How can I track the progress of my ongoing project?",
    answer: "Clients are given access to our exclusive Client Portal. Through the portal, you can view real-time progress updates, see the latest site photos, manage payments, and communicate directly with your project manager."
  },
  {
    question: "What kind of warranty or post-construction support do you provide?",
    answer: "We provide a one-year warranty on structural integrity and against any construction defects. Our team is also available for any support or assistance you may need after you move in."
  }
];


export const COMPANY_INFO = {
    name: "Masuvo Infracon Pvt. Ltd.",
    founder: "Anabik Maity",
    slogan: "Building Beyond Boundaries",
    tagline: "Building Beyond Boundaries",
    mission: "To redefine the real estate landscape in Durgapur by building premium, quality homes that offer unparalleled value and customer satisfaction. We are committed to transparency, innovation, and excellence in every project we undertake.",
    address: "P9, Hambir Sarani, Sector-2C, Bidhannagar, Durgapur, West Bengal 713212",
    phone: "+919749443553",
    whatsapp: "919749443553",
    email: "contact@masuvoinfracon.com",
    website: "https://infraconmasuvo.com/",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=P9,+Hambir+Sarani,+Sector-2C,+Bidhannagar,+Durgapur,+West+Bengal+713212"
};

export const SOCIAL_LINKS = {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#"
};
import type { Property, Service, Testimonial, Notification, FAQ, FloorPlan } from './types';
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
    images: ['assets/properties/bn1a.jpg', 'assets/properties/bn1b.jpg', 'assets/properties/bn1c.jpg'],
    floorPlan: 'assets/floorplans/fpbn1.jpg'
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
    images: ['assets/properties/bn2a.jpg', 'assets/properties/bn2b.jpg', 'assets/properties/bn2c.jpg'],
    floorPlan: 'assets/floorplans/fpbn2.jpg'
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
    images: ['assets/properties/bn3a.jpg', 'assets/properties/bn3b.jpg', 'assets/properties/bn3c.jpg'],
    floorPlan: 'assets/floorplans/fpbn3.jpg'
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
    images: ['assets/properties/bn4a.jpg', 'assets/properties/bn4b.jpg', 'assets/properties/bn4c.jpg'],
    floorPlan: 'assets/floorplans/fpbn4.jpg'
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
    images: ['assets/properties/bn5a.jpg', 'assets/properties/bn5b.jpg', 'assets/properties/bn5c.jpg'],
    floorPlan: 'assets/floorplans/fpbn5.jpg'
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
    images: ['assets/properties/bn6a.jpg', 'assets/properties/bn6b.jpg', 'assets/properties/bn6c.jpg'],
    floorPlan: 'assets/floorplans/fpbn6.jpg'
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
    images: ['assets/properties/bn7a.jpg', 'assets/properties/bn7b.jpg', 'assets/properties/bn7c.jpg'],
    floorPlan: 'assets/floorplans/fpbn7.jpg'
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
    images: ['assets/properties/bn8a.jpg', 'assets/properties/bn8b.jpg', 'assets/properties/bn8c.jpg'],
    floorPlan: 'assets/floorplans/fpbn8.jpg'
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
    images: ['assets/properties/bn9a.jpg', 'assets/properties/bn9b.jpg', 'assets/properties/bn9c.jpg'],
    floorPlan: 'assets/floorplans/fpbn9.jpg'
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
    images: ['assets/properties/d1a.jpg', 'assets/properties/d1b.jpg', 'assets/properties/d1c.jpg'],
    floorPlan: 'assets/floorplans/fpd1.jpg'
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
    images: ['assets/properties/d2a.jpg', 'assets/properties/d2b.jpg', 'assets/properties/d2c.jpg'],
    floorPlan: 'assets/floorplans/fpd2.jpg'
  }
];

export const CONSTRUCTION_SERVICES: Service[] = [
  {
    title: 'New Bungalows',
    description: 'End-to-end construction of premium bungalows, from foundation to finishing, tailored to your vision. Our process ensures quality materials and expert craftsmanship at every stage of the building process.',
    icon: HomeIcon
  },
  {
    title: 'Duplex/Triplex Construction',
    description: 'Specializing in multi-level luxury homes with modern architectural designs and robust engineering. We handle complex structural requirements to create spacious and functional living environments.',
    icon: BuildingOffice2Icon
  },
  {
    title: 'Renovation Services',
    description: 'Transform your existing space with our expert renovation and remodeling solutions. We can update your home to the latest standards, improving both aesthetics and functionality.',
    icon: WrenchScrewdriverIcon
  },
  {
    title: 'Custom Construction',
    description: 'Have a unique plan? We bring your custom architectural dreams to life with precision and quality. Our team works closely with you to ensure every detail of your vision is realized.',
    icon: PaintBrushIcon
  }
];

export const INTERIOR_DESIGN_GALLERY = {
    [InteriorCategory.LivingRoom]: [
        'assets/interiors/lr1.jpg',
        'assets/interiors/lr2.jpg',
        'assets/interiors/lr3.jpg',
    ],
    [InteriorCategory.Bedroom]: [
        'assets/interiors/br1.jpg',
        'assets/interiors/br2.jpg',
        'assets/interiors/br3.jpg',
    ],
    [InteriorCategory.Kitchen]: [
        'assets/interiors/kt1.jpg',
        'assets/interiors/kt2.jpg',
        'assets/interiors/kt3.jpg',
    ],
    [InteriorCategory.Bathroom]: [
        'assets/interiors/bt1.jpg',
        'assets/interiors/bt2.jpg',
        'assets/interiors/bt3.jpg',
    ]
}


export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Masuvo Infracon delivered our dream home on time without compromising on quality. The team was professional and transparent throughout the process.",
    author: "R. & S. Sharma",
    project: "4BHK Duplex, Christianpally",
    avatar: "assets/avatars/avatar1.jpg"
  },
  {
    quote: "The attention to detail in both construction and interiors by Trayaksh is exceptional. Highly recommended for anyone looking for a premium experience.",
    author: "A. Gupta",
    project: "5BHK Triplex, Fuljhore",
    avatar: "assets/avatars/avatar2.jpg"
  },
  {
    quote: "From start to finish, the communication was excellent. The client portal kept us updated, and the final result exceeded our expectations.",
    author: "P. Banerjee",
    project: "3BHK Bungalow, Bidhan Nagar",
    avatar: "assets/avatars/avatar3.jpg"
  },
  {
    quote: "The entire process was seamless, from design to execution. Masuvo Infracon's client portal is a fantastic tool that kept us informed every step of the way.",
    author: "S. & N. Roy",
    project: "Custom 3BHK, Shyampur",
    avatar: "assets/avatars/avatar4.jpg"
  },
  {
    quote: "We approached Trayaksh Interior for our renovation, and they completely transformed our living space. Their design sense is modern and elegant. Truly impressed!",
    author: "M. Verma",
    project: "Interior Renovation, Durgapur-01",
    avatar: "assets/avatars/avatar5.jpg"
  },
  {
    quote: "Building a home can be stressful, but Masuvo Infracon made it an enjoyable journey. Their team is professional, responsive, and dedicated to quality.",
    author: "K. Singh",
    project: "4BHK Duplex, Saptarshi Park",
    avatar: "assets/avatars/avatar6.jpg"
  },
  {
    quote: "The quality of materials and the craftsmanship is top-notch. Our bungalow feels solid and looks beautiful. Thank you for building our forever home.",
    author: "The Das Family",
    project: "Luxury 3BHK, Fuljhore",
    avatar: "assets/avatars/avatar7.jpg"
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


export const FLOOR_PLANS: FloorPlan[] = [
  // 3BHK
  {
    id: 'fp_3bhk_1200',
    type: '3BHK',
    sizeSqFt: 1200,
    configuration: 'Super Built-up Area',
    thumbnailUrl: 'assets/floorplans/thumb_3bhk_1200.jpg',
    viewerUrl: 'https://www.99acres.com/exidmicrosite/property_2d3d_xid.php?property_id=M55383548&p_type=1&from=microsite&is_vtour=1&is_new_vtour=1&menu=0&autoplay=1',
    model3dUrl: 'https://sketchfab.com/models/b7167664323c4a15a31b64e5b97436a1/embed?autospin=1&autostart=1&ui_theme=dark',
    price: '₹24,99,000',
    description: 'This well-designed 3BHK floor plan offers a perfect blend of comfort and functionality. It includes three spacious bedrooms, two modern bathrooms, a contemporary kitchen, a cozy living area, and a private balcony. Ideal for small families seeking an affordable yet elegant home.',
    pdfUrl: '#',
  },
  {
    id: 'fp_3bhk_1400',
    type: '3BHK',
    sizeSqFt: 1400,
    configuration: 'Super Built-up Area',
    thumbnailUrl: 'assets/floorplans/thumb_3bhk_1400.jpg',
    viewerUrl: 'https://www.99acres.com/exidmicrosite/property_2d3d_xid.php?property_id=M55383548&p_type=1&from=microsite&is_vtour=1&is_new_vtour=1&menu=0&autoplay=1',
    model3dUrl: 'https://sketchfab.com/models/d69e853114a84985a73e13768393539e/embed?autospin=1&autostart=1&ui_theme=dark',
    price: '₹26,99,000',
    description: 'An expansive 1400 sq. ft. 3BHK layout featuring larger bedrooms and an open-concept living and dining space. Includes three bedrooms, two bathrooms, a utility area attached to the kitchen, and enhanced natural lighting. Perfect for families desiring more space and luxury.',
    pdfUrl: '#',
  },
  // 4BHK
  {
    id: 'fp_4bhk_1500',
    type: '4BHK',
    sizeSqFt: 1500,
    configuration: 'Super Built-up Area',
    thumbnailUrl: 'assets/floorplans/thumb_4bhk_1500.jpg',
    viewerUrl: 'https://www.99acres.com/exidmicrosite/property_2d3d_xid.php?property_id=M55383548&p_type=1&from=microsite&is_vtour=1&is_new_vtour=1&menu=0&autoplay=1',
    model3dUrl: 'https://sketchfab.com/models/4e80f08147d4464bb67d934151703666/embed?autospin=1&autostart=1&ui_theme=dark',
    price: '₹27,99,000',
    description: 'A spacious 4BHK duplex design optimized for modern family living. The ground floor comprises a living area, kitchen, dining, and one bedroom, while the first floor houses three additional bedrooms. Includes four bedrooms, three bathrooms, a family lounge, and two balconies.',
    pdfUrl: '#',
  },
  {
    id: 'fp_4bhk_1800',
    type: '4BHK',
    sizeSqFt: 1800,
    configuration: 'Super Built-up Area',
    thumbnailUrl: 'assets/floorplans/thumb_4bhk_1800.jpg',
    viewerUrl: 'https://www.99acres.com/exidmicrosite/property_2d3d_xid.php?property_id=M55383548&p_type=1&from=microsite&is_vtour=1&is_new_vtour=1&menu=0&autoplay=1',
    model3dUrl: 'https://sketchfab.com/models/3052ac66a31945a29858348393081e7d/embed?autospin=1&autostart=1&ui_theme=dark',
    price: '₹35,49,000',
    description: 'Luxury 4BHK duplex offering generous room sizes and premium specifications. This layout includes four large bedrooms, four attached bathrooms, a modular kitchen, a separate servant room, a large terrace, and dedicated parking. Designed for those who appreciate fine living.',
    pdfUrl: '#',
  },
  // 5BHK
  {
    id: 'fp_5bhk_2200',
    type: '5BHK',
    sizeSqFt: 2200,
    configuration: 'Super Built-up Area',
    thumbnailUrl: 'assets/floorplans/thumb_5bhk_2200.jpg',
    viewerUrl: 'https://www.99acres.com/exidmicrosite/property_2d3d_xid.php?property_id=M55383548&p_type=1&from=microsite&is_vtour=1&is_new_vtour=1&menu=0&autoplay=1',
    model3dUrl: 'https://sketchfab.com/models/2034914c68f447a19548f9e2b1022944/embed?autospin=1&autostart=1&ui_theme=dark',
    price: 'Price on Request',
    description: 'The ultimate in luxury and space, this 5BHK triplex plan is designed for large families. It features five master bedrooms with en-suite bathrooms, a home theater room, a private gym, a sprawling terrace garden, and a double-height living room. Every detail is crafted to perfection.',
    pdfUrl: '#',
  },
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
    googleMapsLink: "https://share.google/SRPM2ZIIsSernVj0P"
};

export const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/masuvo.infraco",
    instagram: "https://www.instagram.com/masuvoinfracon/",
    linkedin: "https://www.linkedin.com/in/animeshmaji/",
    youtube: "https://www.youtube.com/@masuvoinfracon",
    x: "https://x.com/MasuvoInfracon"
};
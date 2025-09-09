import {
    BuildingOffice2Icon,
    WrenchScrewdriverIcon,
    PaintBrushIcon,
} from '@heroicons/react/24/solid';
import { Property, Service, Testimonial, InteriorCategory, FloorPlan, Project } from './types';

export const COMPANY_INFO = {
    name: 'Masuvo Infracon Pvt. Ltd.',
    tagline: 'Your Dream, Our Foundation.',
    founder: 'Mr. Suvankar Maji',
    address: 'City Centre, Durgapur, West Bengal, India',
    phone: '+919876543210',
    whatsapp: '919876543210',
    email: 'imasuvo@gmail.com',
    website: 'https://infraconmasuvo.com',
    googleMapsLink: 'https://maps.app.goo.gl/abcdefg123456',
};

export const SOCIAL_LINKS = {
    facebook: '#',
    instagram: '#',
    x: '#',
    linkedin: '#',
    youtube: '#',
};

export const PROPERTIES: Property[] = [
    {
        id: 'p1',
        title: 'Elegant 4BHK Duplex in Bidhan Nagar',
        price: '₹ 1.2 Cr',
        subLocation: 'Near City Centre, Bidhan Nagar',
        mainArea: 'BIDHAN NAGAR AREA',
        type: '4BHK',
        style: 'Duplex',
        size: 2400,
        landArea: '3 Kottah',
        description: 'A stunning duplex with modern amenities, spacious rooms, and a beautiful garden. Perfect for families looking for a blend of luxury and comfort.',
        images: ['https://picsum.photos/seed/p1-1/800/600', 'https://picsum.photos/seed/p1-2/800/600', 'https://picsum.photos/seed/p1-3/800/600'],
        floorPlan: 'https://picsum.photos/seed/fp1/800/600',
    },
    {
        id: 'p2',
        title: 'Modern 3BHK Bungalow in Durgapur-01',
        price: '₹ 85 Lacs',
        subLocation: 'A-Zone, Durgapur',
        mainArea: 'DURGAPUR -01 AREA',
        type: '3BHK',
        style: 'Bungalow',
        size: 1800,
        description: 'A cozy and modern bungalow located in a prime area. Features an open-plan living space and high-quality fittings.',
        images: ['https://picsum.photos/seed/p2-1/800/600', 'https://picsum.photos/seed/p2-2/800/600'],
        floorPlan: 'https://picsum.photos/seed/fp2/800/600',
    },
    {
        id: 'p3',
        title: 'Spacious 5BHK Triplex Villa',
        price: '₹ 2.5 Cr',
        subLocation: 'B-Zone, Bidhan Nagar',
        mainArea: 'BIDHAN NAGAR AREA',
        type: '5BHK',
        style: 'Triplex',
        size: 4000,
        landArea: '5 Kottah',
        description: 'The epitome of luxury. This triplex villa boasts a private elevator, terrace garden, and home theatre. An exclusive residence for the discerning buyer.',
        images: ['https://picsum.photos/seed/p3-1/800/600', 'https://picsum.photos/seed/p3-2/800/600', 'https://picsum.photos/seed/p3-3/800/600', 'https://picsum.photos/seed/p3-4/800/600'],
        floorPlan: 'https://picsum.photos/seed/fp3/800/600',
    }
];

export const CONSTRUCTION_SERVICES: Service[] = [
    {
        icon: BuildingOffice2Icon,
        title: 'Residential Construction',
        description: 'From foundation to finishing, we build high-quality, durable homes including bungalows, duplexes, and multi-story residences tailored to your needs.',
    },
    {
        icon: WrenchScrewdriverIcon,
        title: 'Structural Engineering',
        description: 'Our expert engineers ensure the structural integrity and safety of your building, using advanced analysis and design techniques.',
    },
    {
        icon: PaintBrushIcon,
        title: 'Interior & Exterior Finishes',
        description: 'We provide premium finishing services, including painting, plastering, flooring, and facade work, to give your property a polished and appealing look.',
    },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: 'Masuvo Infracon turned our dream into a reality. The quality of construction and attention to detail was exceptional. Highly recommended!',
        author: 'A. K. Sharma',
        project: '4BHK Duplex in Bidhan Nagar',
        avatar: 'https://picsum.photos/seed/avatar1/100/100',
    },
    {
        quote: 'The entire process, from design to handover, was seamless. The team was professional, transparent, and delivered on time. We love our new home!',
        author: 'Sunita Roy',
        project: '3BHK Bungalow in A-Zone',
        avatar: 'https://picsum.photos/seed/avatar2/100/100',
    },
];

export const INTERIOR_DESIGN_GALLERY: Record<InteriorCategory, string[]> = {
    [InteriorCategory.LivingRoom]: [
        'https://picsum.photos/seed/lr1/400/300', 'https://picsum.photos/seed/lr2/400/300',
        'https://picsum.photos/seed/lr3/400/300', 'https://picsum.photos/seed/lr4/400/300'
    ],
    [InteriorCategory.Bedroom]: [
        'https://picsum.photos/seed/br1/400/300', 'https://picsum.photos/seed/br2/400/300',
        'https://picsum.photos/seed/br3/400/300', 'https://picsum.photos/seed/br4/400/300'
    ],
    [InteriorCategory.Kitchen]: [
        'https://picsum.photos/seed/kc1/400/300', 'https://picsum.photos/seed/kc2/400/300',
        'https://picsum.photos/seed/kc3/400/300', 'https://picsum.photos/seed/kc4/400/300'
    ],
    [InteriorCategory.Bathroom]: [
        'https://picsum.photos/seed/ba1/400/300', 'https://picsum.photos/seed/ba2/400/300'
    ],
    [InteriorCategory.Office]: [
        'https://picsum.photos/seed/of1/400/300', 'https://picsum.photos/seed/of2/400/300'
    ],
};

export const FAQS = [
    {
        question: "What types of construction projects do you handle?",
        answer: "We specialize in residential construction, including custom bungalows, duplexes, and triplex villas. We also offer interior design and land acquisition services."
    },
    {
        question: "How long does a typical construction project take?",
        answer: "The timeline varies depending on the project's complexity and size. A standard 2000 sq.ft. residential building typically takes around 10-12 months from foundation to handover."
    },
    {
        question: "Can I customize the floor plans?",
        answer: "Absolutely! We encourage customization. Our team works closely with you to design a home that fits your lifestyle and preferences perfectly."
    }
];

export const FLOOR_PLANS: FloorPlan[] = [
    {
        id: 'fp-3bhk-1800',
        type: '3BHK',
        sizeSqFt: 1800,
        configuration: '3 Beds, 3 Baths, 2 Balconies',
        price: '₹ 75 Lacs onwards',
        thumbnailUrl: 'https://picsum.photos/seed/fp-thumb-1/400/300',
        model3dUrl: 'https://my.matterport.com/show/?m=aAbBcC12345',
        description: 'An efficient and spacious 3BHK layout perfect for modern families. Features an open-plan living area and well-ventilated bedrooms.'
    },
    {
        id: 'fp-4bhk-2400',
        type: '4BHK',
        sizeSqFt: 2400,
        configuration: '4 Beds, 4 Baths, Puja Room, 3 Balconies',
        price: '₹ 1.1 Cr onwards',
        thumbnailUrl: 'https://picsum.photos/seed/fp-thumb-2/400/300',
        model3dUrl: 'https://my.matterport.com/show/?m=dDeEfF67890',
        description: 'A luxurious 4BHK design with ample space for everyone. Includes a dedicated puja room and large balconies for relaxation.'
    },
    {
        id: 'fp-5bhk-3200',
        type: '5BHK',
        sizeSqFt: 3200,
        configuration: '5 Beds, 5 Baths, Home Office, Terrace Garden',
        price: '₹ 1.8 Cr onwards',
        thumbnailUrl: 'https://picsum.photos/seed/fp-thumb-3/400/300',
        model3dUrl: 'https://my.matterport.com/show/?m=gGhHiI54321',
        description: 'The ultimate in luxury living. This expansive 5BHK plan features a home office, a private terrace garden, and premium finishes.'
    },
];

export const MOCK_PROJECT_DATA: Project = {
  id: "PROJ-123",
  clientName: "Animesh Maji",
  projectName: "4BHK Duplex at Bidhan Nagar",
  status: 'Ongoing',
  progress: 65,
  updates: [
    { id: 4, date: "2024-07-20", title: "Internal Plastering Started", description: "Internal wall plastering work has commenced on the first floor.", stage: 'Finishing', imageUrl: "https://picsum.photos/seed/update4/800/600" },
    { id: 3, date: "2024-06-15", title: "Roof Casting Complete", description: "The final roof slab has been cast successfully. Curing is in progress.", stage: 'Framing', imageUrl: "https://picsum.photos/seed/update3/800/600" },
    { id: 2, date: "2024-05-10", title: "Foundation Work Finished", description: "Foundation and plinth beam work have been completed as per the structural drawings.", stage: 'Foundation', imageUrl: "https://picsum.photos/seed/update2/800/600" },
    { id: 1, date: "2024-04-01", title: "Project Kick-off", description: "Site cleared and project officially started.", stage: 'Planning' },
  ],
  documents: [
    { id: 1, name: "Architectural Plan v2.pdf", url: "#", type: 'Plan' },
    { id: 2, name: "Construction Agreement.pdf", url: "#", type: 'Contract' },
    { id: 3, name: "Invoice-JUL2024.pdf", url: "#", type: 'Invoice' },
  ],
};

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export interface Property {
    id: string;
    title: string;
    price: string;
    subLocation: string;
    mainArea: 'BIDHAN NAGAR AREA' | 'DURGAPUR -01 AREA';
    type: '3BHK' | '4BHK' | '5BHK';
    style: 'Bungalow' | 'Duplex' | 'Triplex';
    size: number; // sq. ft.
    landArea?: string;
    description: string;
    images?: string[];
    floorPlan: string;
}

export interface Service {
    icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>;
    title: string;
    description: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    project: string;
    avatar: string;
}

export type QualityOption = 'Basic' | 'Medium' | 'Premium' | 'Platform/Sink' | 'Semi Modular' | 'Modular';

export interface Resource {
    name: string;
    unit: string;
    quantityFactor: number;
    qualityOptions: { [key: string]: number };
    defaultQuality: QualityOption;
}

export interface CalculatedResource extends Resource {
    selectedQuality: QualityOption;
    calculatedQuantity: string;
    calculatedAmount: number;
}

export enum InteriorCategory {
    LivingRoom = "Living Room",
    Bedroom = "Bedroom",
    Kitchen = "Kitchen",
    Bathroom = "Bathroom",
    Office = "Office",
}

export interface FloorPlan {
    id: string;
    type: '3BHK' | '4BHK' | '5BHK';
    sizeSqFt: number;
    configuration: string;
    price: string;
    thumbnailUrl: string;
    model3dUrl: string;
    description: string;
}

export interface ProjectUpdate {
  id: number;
  date: string;
  title: string;
  description: string;
  stage: 'Planning' | 'Foundation' | 'Framing' | 'Finishing' | 'Completed';
  imageUrl?: string;
}

export interface ProjectDocument {
  id: number;
  name: string;
  url: string;
  type: 'Plan' | 'Contract' | 'Invoice';
}

export interface Project {
  id: string;
  clientName: string;
  projectName: string;
  status: 'Ongoing' | 'Completed' | 'On Hold';
  progress: number;
  updates: ProjectUpdate[];
  documents: ProjectDocument[];
}

export interface AdminProject {
  id: string;
  projectName: string;
  client: string;
  startDate: string;
  progress: string;
}

export interface ClientDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
}
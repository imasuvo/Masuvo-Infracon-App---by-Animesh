import React from 'react';

export interface Property {
  id: string;
  title: string;
  mainArea: 'BIDHAN NAGAR AREA' | 'DURGAPUR -01 AREA';
  subLocation: string;
  type: '3BHK' | '4BHK' | '5BHK';
  style: 'Normal' | 'Luxury' | 'Duplex';
  size: number; // in sq. ft.
  landArea?: string; // e.g., "1.7 Kattha"
  price: string;
  priceValue: number; // Price in Lakhs for filtering/sorting
  description: string;
  images: string[];
  floorPlan: string;
}

export interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Testimonial {
  quote: string;
  author: string;
  project: string;
}

export enum InteriorCategory {
    LivingRoom = 'Living Room',
    Bedroom = 'Bedroom',
    Kitchen = 'Kitchen',
    Bathroom = 'Bathroom'
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ChatMessage {
  sender: 'PM' | 'You';
  text: string;
  timestamp: string;
}

export type QualityOption = 'Basic' | 'Medium' | 'Premium' | 'Platform/Sink' | 'Semi Modular' | 'Modular';

export interface Resource {
  name: string;
  unit: string;
  quantityFactor: number; // per sqft
  qualityOptions: {
    [key in QualityOption]?: number; // price per unit
  };
  defaultQuality: QualityOption;
}

export interface CalculatedResource extends Resource {
  selectedQuality: QualityOption;
  calculatedQuantity: string;
  calculatedAmount: number;
}
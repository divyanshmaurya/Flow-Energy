
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  specs?: string[];
}

export enum ProductCategory {
  INSTRUMENTATION = 'Instrumentation',
  VALVES = 'Valves',
  FITTINGS = 'Fittings',
  PNEUMATICS = 'Pneumatics',
  HOSES = 'Hoses & Tubes',
  SAFETY = 'Safety & Consumables'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

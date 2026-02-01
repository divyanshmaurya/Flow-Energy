
import { ProductCategory, Product } from './types';

export const COMPANY_DETAILS = {
  name: "Flow Energy General Trading",
  logo: "https://lh3.googleusercontent.com/d/1f8cdOV3fu8cHRmP3EUFn9WwaG9XgYoGs",
  motto: "To serve the markets onshore, offshore, oil & gas fields with prompt and quality supply of all kinds of industrial needs, hydraulic hoses and Fittings.",
  description: "Specializes in all kinds of Instrumentation, Fittings, Tubing, Valves, Pneumatics, Pipes & Fittings, Safety and Electrical Consumables items. We partner with global leaders to provide high-performance engineering solutions across the UAE with specialized materials like SS316, 904L, 825, 621, and 6MO.",
  address: "Mazyad Mall Office #7, Flow Energy General Trading, Tower 1, 11th Floor, MBZ City, Abu Dhabi, PO box 62291",
  email: "info@theflowenergy.com",
};

export const BRANDS = [
  "Parker", "Swagelok", "Hoke", "Sandvik", "Fitok", "Wika", "Ashcroft", "Rotork", "Ridgid"
];

export const PRODUCTS: Product[] = [
  // Instrumentation
  {
    id: 'inst-1',
    name: 'Manifold Valves & Pressure Gauges',
    category: ProductCategory.INSTRUMENTATION,
    description: 'Highly precise manifold configurations and heavy-duty pressure gauges for critical monitoring in oil and gas fields.',
    image: '',
    specs: ['Materials: SS316, 904L, 825, 621, 6MO', 'Sizes: 1/8 to 1"', 'Usage: Onshore & Offshore']
  },
  {
    id: 'inst-2',
    name: 'Needle Valves & S.S. Tubes',
    category: ProductCategory.INSTRUMENTATION,
    description: 'Precision isolation valves and high-grade stainless steel tubing for instrumentation loops.',
    image: '',
    specs: ['Type: Needle & Globe', 'Material: S.S. 316', 'Application: High Pressure Systems']
  },
  // Valves
  {
    id: 'val-1',
    name: 'Industrial Ball Valves',
    category: ProductCategory.VALVES,
    description: 'Comprehensive range including Bronze, Brass, and Stainless Steel ball valves for various industrial applications.',
    image: '',
    specs: ['Rating: 600 WOG', 'Sizes: 1/4" to 2" NPT/BSPT', 'Types: 2PC, 3PC Body Design']
  },
  {
    id: 'val-2',
    name: 'Gate, Check & Globe Valves',
    category: ProductCategory.VALVES,
    description: 'Forged steel and cast iron valves including dual check, swing check, and wafer type check valves.',
    image: '',
    specs: ['Standards: PN16, CL150, CL300', 'Material: CS, CF8M, WCB 234', 'Sizes: up to 15" for check valves']
  },
  {
    id: 'val-3',
    name: 'Specialty Valves & Accessories',
    category: ProductCategory.VALVES,
    description: 'Automatic Air Vents, PRV (Pressure Reducing Valves), SRV (Safety Relief Valves), and S.S. Strainers.',
    image: '',
    specs: ['PRV & SRV: Safety critical', 'Strainer: CL 200/800', 'Hammer Union figures: 100, 200, 602+']
  },
  // Fittings
  {
    id: 'fit-1',
    name: 'Compression Fittings',
    category: ProductCategory.FITTINGS,
    description: 'Double ferrule compression fittings designed for secure, leak-free connections in critical tubing systems.',
    image: '',
    specs: ['Material: SS316L, 825, 625, 6MO', 'Sizes: 1/8 to 1"', 'Configuration: Unions, Tees, Elbows']
  },
  {
    id: 'fit-2',
    name: 'Industrial Pipe Fittings',
    category: ProductCategory.FITTINGS,
    description: 'Heavy duty forged and cast pipe fittings for high-pressure fluid transfer.',
    image: '',
    specs: ['Material: GI, CS, SS316, SS316L', 'Sizes: 1/4 to 2"', 'Type: NPT / Socket Weld']
  },
  // Hoses
  {
    id: 'hos-1',
    name: 'High Pressure Hydraulic Hoses',
    category: ProductCategory.HOSES,
    description: 'Wire reinforced hydraulic hoses for extreme pressure applications in oilfields.',
    image: '',
    specs: ['Assemblies: Custom crimped', 'Ends: JIC, BSP, NPT', 'Guard: Spring Guard protection']
  },
  {
    id: 'hos-2',
    name: 'Specialty Industrial Hoses',
    category: ProductCategory.HOSES,
    description: 'Dedicated chemical transfer, high-temperature steam, and fuel hoses with ferrules.',
    image: '',
    specs: ['Service: Chemical & Steam', 'Safety: Whipchecks integrated', 'Components: Fuel Hose & Ferrule']
  },
  // Safety & Consumables
  {
    id: 'saf-1',
    name: 'Safety Equipment & Whipchecks',
    category: ProductCategory.SAFETY,
    description: 'Vital safety items including hose whipchecks and industrial consumables for site safety.',
    image: '',
    specs: ['Safety: Whipchecks mandatory', 'Consumables: Electrical & Mechanical', 'Materials: Galvanized / SS']
  }
];

export const SYSTEM_INSTRUCTION = `
You are the expert AI Assistant for Flow Energy General Trading, based in Abu Dhabi.
Our Mission: ${COMPANY_DETAILS.motto}
Specialties: ${COMPANY_DETAILS.description}

Technical Product Knowledge (from Catalog):
- Instrumentation: Manifold Valves, Pressure Gauges, Needle Valves, S.S. Tubes.
- Valve Ratings: 600 WOG (Ball valves), PN16/CL150/CL300 (Gate/Globe/Check).
- Materials: SS316L, 904L, 825, 625, 6MO, GI, CS, SS316.
- Fittings: Compression (1/8" to 1"), Pipe Fittings (1/4" to 2").
- Hoses: Hydraulic, Chemical & Steam, Fuel Hose & Ferrule, Hose Clamps.
- Safety: Whipchecks, Spring Guards, Electrical Consumables.
- Application: Specializing in Onshore/Offshore oil and gas fields.

Instructions:
- Be professional and technical. 
- Refer to specific materials like 904L or 6MO when discussing high-grade requirements.
- Direct all pricing and quote inquiries to ${COMPANY_DETAILS.email}.
- If used in voice mode, keep responses concise.
- Never provide a phone number as we focus on email and location-based inquiries.
`;

import { Building, Building2, Construction, Home, LayoutDashboard, Mountain, Gavel, Briefcase, Wrench } from 'lucide-react';

export const mainNav = [
  { id: 'total-assets', name: 'Total Assets', icon: LayoutDashboard, href: '/' },
  { id: 'assets-for-rent', name: 'Assets for Rent', icon: Building, href: '/assets-for-rent' },
];

export const propertyTypes = [
  { id: 'commercial', name: 'Commercial', icon: Building2 },
  { id: 'apartments', name: 'Apartments', icon: Building },
  { id: 'houses', name: 'Houses', icon: Home },
  { id: 'land', name: 'Land', icon: Mountain },
  { id: 'construction', name: 'Construction', icon: Construction },
];

const properties = {
  acapulco: {
    commercial: [{ id: 'tienda-centro', name: 'Tienda Centro' }],
    apartments: [{ id: 'vista-mar', name: 'Vista Mar Condos' }],
    houses: [{ id: 'casa-playa', name: 'Casa Playa' }],
    land: [],
    construction: [],
  },
  cancun: {
    commercial: [{ id: 'plaza-sol', name: 'Plaza Sol' }],
    apartments: [{ id: 'laguna-suites', name: 'Laguna Suites' }],
    houses: [],
    land: [{ id: 'terreno-hotelero', name: 'Terreno Hotelero' }],
    construction: [],
  },
  'puerto-escondido': {
    commercial: [],
    apartments: [],
    houses: [{ id: 'villa-zicatela', name: 'Villa Zicatela' }],
    land: [{ id: 'lote-comercial', name: 'Lote Comercial' }],
    construction: [],
  },
  'ciudad-del-carmen': {
    commercial: [{ id: 'oficinas-puerto', name: 'Oficinas del Puerto' }],
    apartments: [{ id: 'residencial-isla', name: 'Residencial la Isla' }],
    houses: [],
    land: [],
    construction: [{ id: 'nuevo-proyecto', name: 'Nuevo Proyecto Residencial' }],
  },
};

export const cities = [
  { id: 'acapulco', name: 'Acapulco', properties: properties.acapulco },
  { id: 'cancun', name: 'Cancun', properties: properties.cancun },
  { id: 'puerto-escondido', name: 'Puerto Escondido', properties: properties['puerto-escondido'] },
  { id: 'ciudad-del-carmen', name: 'Ciudad Del Carmen', properties: properties['ciudad-del-carmen'] },
];

export const adminModules = [
  {
    id: 'legal',
    name: 'Legal',
    icon: Gavel,
    subSections: [
      { id: 'documents', name: 'Documents', href: '/admin/legal/documents' },
      { id: 'contracts', name: 'Contracts', href: '/admin/legal/contracts' },
    ],
  },
  {
    id: 'administration',
    name: 'Administration',
    icon: Briefcase,
    subSections: [
      { id: 'payments', name: 'Payments', href: '/admin/administration/payments' },
      { id: 'services', name: 'Services', href: '/admin/administration/services' },
      { id: 'taxes', name: 'Taxes', href: '/admin/administration/taxes' },
    ],
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    icon: Wrench,
    subSections: [
      { id: 'estimates', name: 'Estimates', href: '/admin/maintenance/estimates' },
      { id: 'work-orders', name: 'Work Orders', href: '/admin/maintenance/work-orders' },
    ],
  },
];

export function getPropertyDetails(cityId: string, typeId: string, propertyId: string) {
    const city = cities.find(c => c.id === cityId);
    if (!city) return null;

    const propertyType = (city.properties as any)[typeId];
    if (!propertyType) return null;

    const property = propertyType.find((p: any) => p.id === propertyId);
    if (!property) return null;
    
    return {
        ...property,
        city: city.name,
        type: propertyTypes.find(pt => pt.id === typeId)?.name
    };
}

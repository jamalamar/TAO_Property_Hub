import { Building, Building2, Construction, Home, LayoutDashboard, Mountain, Gavel, Briefcase, Wrench, Warehouse } from 'lucide-react';

export const mainNav = [
  { id: 'total-assets', name: 'Activos Totales', icon: LayoutDashboard, href: '/' },
  { id: 'assets-for-rent', name: 'Activos en Renta', icon: Building, href: '/assets-for-rent' },
];

export const propertyTypes = [
  { id: 'commercial', name: 'Comercial', icon: Building2 },
  { id: 'apartments', name: 'Apartamentos', icon: Building },
  { id: 'houses', name: 'Casas', icon: Home },
  { id: 'land', name: 'Terrenos', icon: Mountain },
  { id: 'construction', name: 'Construcción', icon: Construction },
];

const properties = {
  acapulco: {
    commercial: [{ id: 'tienda-centro', name: 'Tienda Centro' }],
    apartments: [{ id: 'vista-mar', name: 'Condominios Vista Mar' }],
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
  { id: 'cancun', name: 'Cancún', properties: properties.cancun },
  { id: 'puerto-escondido', name: 'Puerto Escondido', properties: properties['puerto-escondido'] },
  { id: 'ciudad-del-carmen', name: 'Ciudad Del Carmen', properties: properties['ciudad-del-carmen'] },
];

export const adminModules = [
  {
    id: 'legal',
    name: 'Legal',
    icon: Gavel,
    href: '/admin/legal'
  },
  {
    id: 'administration',
    name: 'Administración',
    icon: Briefcase,
    href: '/admin/administration'
  },
  {
    id: 'maintenance',
    name: 'Mantenimiento',
    icon: Wrench,
    href: '/admin/maintenance'
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


export function getAllProperties() {
  const allProperties: any[] = [];
  cities.forEach(city => {
    Object.keys(city.properties).forEach(typeId => {
      const typeProperties = (city.properties as any)[typeId];
      if (typeProperties.length > 0) {
        const typeName = propertyTypes.find(pt => pt.id === typeId)?.name;
        typeProperties.forEach((prop: any) => {
          allProperties.push({
            ...prop,
            city: city.name,
            cityId: city.id,
            type: typeName,
            typeId: typeId,
          });
        });
      }
    });
  });
  return allProperties;
}

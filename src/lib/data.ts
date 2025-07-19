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
    commercial: [{ id: 'tienda-centro', name: 'Tienda Centro', owner: 'Inversiones Sol S.A.', cost: 1500000, tenant: 'Super Ahorro', size: '500 m²' }],
    apartments: [{ id: 'vista-mar', name: 'Condominios Vista Mar', owner: 'Desarrollos Marinos', cost: 3200000, tenant: 'Múltiples', size: '12 unidades' }],
    houses: [{ id: 'casa-playa', name: 'Casa Playa', owner: 'Familia Pérez', cost: 850000, tenant: null, size: '300 m²' }],
    land: [],
    construction: [],
  },
  cancun: {
    commercial: [{ id: 'plaza-sol', name: 'Plaza Sol', owner: 'Grupo Comercial del Sureste', cost: 5500000, tenant: 'Múltiples', size: '25 locales' }],
    apartments: [{ id: 'laguna-suites', name: 'Laguna Suites', owner: 'Desarrollos Marinos', cost: 4100000, tenant: 'Múltiples', size: '20 suites' }],
    houses: [],
    land: [{ id: 'terreno-hotelero', name: 'Terreno Hotelero', owner: 'Inversiones TAO', cost: 2300000, tenant: null, size: '2 hectáreas' }],
    construction: [],
  },
  'puerto-escondido': {
    commercial: [],
    apartments: [],
    houses: [{ id: 'villa-zicatela', name: 'Villa Zicatela', owner: 'Familia López', cost: 1200000, tenant: 'Renta Vacacional', size: '450 m²' }],
    land: [{ id: 'lote-comercial', name: 'Lote Comercial', owner: 'Inversiones TAO', cost: 600000, tenant: null, size: '1000 m²' }],
    construction: [],
  },
  'ciudad-del-carmen': {
    commercial: [{ id: 'oficinas-puerto', name: 'Oficinas del Puerto', owner: 'Servicios Portuarios Integrados', cost: 2800000, tenant: 'PEMEX', size: '1200 m²' }],
    apartments: [{ id: 'residencial-isla', name: 'Residencial la Isla', owner: 'Constructora del Golfo', cost: 3500000, tenant: 'Múltiples', size: '15 departamentos' }],
    houses: [],
    land: [],
    construction: [{ id: 'nuevo-proyecto', name: 'Nuevo Proyecto Residencial', owner: 'Constructora del Golfo', cost: 6000000, tenant: 'N/A', size: 'En desarrollo' }],
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

export const maintenanceStatuses = [
  { id: 'pending', name: 'Pendiente', color: 'bg-yellow-500' },
  { id: 'in_progress', name: 'En Progreso', color: 'bg-blue-500' },
  { id: 'completed', name: 'Completado', color: 'bg-green-500' },
  { id: 'cancelled', name: 'Cancelado', color: 'bg-red-500' },
];

export const maintenanceRequests = [
    { 
        id: 'REQ-001', 
        propertyId: 'vista-mar',
        propertyName: 'Condominios Vista Mar', 
        description: 'Fuga de agua en el baño principal del departamento 5B.',
        status: 'pending',
        reportedDate: '2024-07-28',
        assignedTo: 'Plomería Express'
    },
    { 
        id: 'REQ-002', 
        propertyId: 'plaza-sol',
        propertyName: 'Plaza Sol', 
        description: 'Fallo en el sistema de aire acondicionado del local 12.',
        status: 'in_progress',
        reportedDate: '2024-07-27',
        assignedTo: 'Climas del Caribe'
    },
    { 
        id: 'REQ-003', 
        propertyId: 'villa-zicatela',
        propertyName: 'Villa Zicatela', 
        description: 'Reparación de la bomba de la alberca.',
        status: 'completed',
        reportedDate: '2024-07-25',
        assignedTo: 'Mantenimiento Interno'
    },
    { 
        id: 'REQ-004', 
        propertyId: 'oficinas-puerto',
        propertyName: 'Oficinas del Puerto', 
        description: 'Pintura exterior de la fachada norte.',
        status: 'pending',
        reportedDate: '2024-07-29',
        assignedTo: 'Constructora del Golfo'
    },
     { 
        id: 'REQ-005', 
        propertyId: 'casa-playa',
        propertyName: 'Casa Playa', 
        description: 'Revisión del sistema eléctrico.',
        status: 'cancelled',
        reportedDate: '2024-07-26',
        assignedTo: null
    },
];

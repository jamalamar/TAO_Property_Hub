"use client";

import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { adminModules, getPropertyDetails } from '@/lib/data';

function generateBreadcrumbs(pathname: string) {
    if (pathname === '/') return 'Activos Totales';

    const pathParts = pathname.split('/').filter(p => p);

    if (pathParts[0] === 'property' && pathParts.length === 4) {
        const [_, cityId, typeId, propertyId] = pathParts;
        const details = getPropertyDetails(cityId, typeId, propertyId);
        return details ? `${details.city} > ${details.type} > ${details.name}` : 'Propiedad';
    }

    if(pathParts[0] === 'admin' && pathParts.length >= 2) {
        const [_, moduleId] = pathParts;
        const module = adminModules.find(m => m.id === moduleId);
        return module ? `Admin > ${module.name}` : 'Admin';
    }

    if(pathParts[0] === 'assets-for-rent') {
        return 'Activos en Renta';
    }

    // Capitalize and join
    return pathParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).replace('-', ' ')).join(' > ');
}


export function Header({ role, onRoleChange }: { role: string; onRoleChange: (role: string) => void; }) {
  const pathname = usePathname();
  const breadcrumb = generateBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{breadcrumb}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Select value={role} onValueChange={onRoleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="socio-director">Socio Director</SelectItem>
            <SelectItem value="invitado">Invitado</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="rounded-full">
          <UserCircle className="h-5 w-5" />
          <span className="sr-only">Menú de usuario</span>
        </Button>
      </div>
    </header>
  );
}

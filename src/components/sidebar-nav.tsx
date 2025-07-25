"use client";

import Link from 'next/link';
import { useNavigation } from '@/hooks/use-navigation';
import { adminModules, cities, mainNav, propertyTypes } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function SidebarNav({ role }: { role: string }) {
  const { isActive } = useNavigation();
  const searchParams = useSearchParams();

  const createHrefWithRole = (href: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return `${href}?${params.toString()}`;
  }

  const isSocioOrInvitado = role === 'socio-director' || role === 'invitado';
  const isSocioOrAdmin = role === 'socio-director' || role === 'admin';
  const isInvitado = role === 'invitado';

  return (
    <>
      {isSocioOrInvitado && (
        <>
          {!isInvitado && (
            <SidebarGroup>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarMenu>
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)}>
                      <Link href={createHrefWithRole(item.href)}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )}

          {!isInvitado && <SidebarSeparator />}

          <SidebarGroup>
            <SidebarGroupLabel>Activos por Ciudad</SidebarGroupLabel>
            <Accordion type="multiple" className="w-full px-2">
              {cities.map((city) => (
                <AccordionItem value={city.id} key={city.id} className="border-none">
                  <AccordionTrigger className="hover:no-underline text-sm font-medium rounded-md px-2 hover:bg-sidebar-accent">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{city.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-4 pt-1">
                    <Accordion type="multiple" className="w-full">
                      {propertyTypes.map((type) => {
                        const properties = (city.properties as any)[type.id];
                        if (!properties || properties.length === 0) return null;
                        
                        return (
                          <AccordionItem value={`${city.id}-${type.id}`} key={type.id} className="border-none">
                            <AccordionTrigger className="hover:no-underline text-xs rounded-md px-2 py-1.5 hover:bg-sidebar-accent">
                               <div className="flex items-center gap-2">
                                 <type.icon className="h-4 w-4" />
                                 <span>{type.name}</span>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-4 pt-1">
                              <ul>
                                {properties.map((property: any) => (
                                   <li key={property.id}>
                                    <Link href={createHrefWithRole(`/property/${city.id}/${type.id}/${property.id}`)} className={`block text-xs py-1 px-2 rounded-md hover:bg-sidebar-accent ${isActive(`/property/${city.id}/${type.id}/${property.id}`) ? 'bg-sidebar-accent' : ''}`}>
                                      {property.name}
                                    </Link>
                                   </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SidebarGroup>
        </>
      )}

      {isSocioOrAdmin && (
        <>
          {isSocioOrInvitado && <SidebarSeparator />}
          
          <SidebarGroup>
            <SidebarGroupLabel>Módulos de Administración</SidebarGroupLabel>
            <SidebarMenu>
              {adminModules.map((module) => (
                <SidebarMenuItem key={module.id}>
                  <SidebarMenuButton asChild isActive={isActive(module.href)}>
                    <Link href={createHrefWithRole(module.href)}>
                      <module.icon />
                      <span>{module.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </>
      )}
    </>
  );
}

"use client";

import Link from 'next/link';
import { useNavigation } from '@/hooks/use-navigation';
import { adminModules, cities, mainNav, propertyTypes } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { MapPin } from 'lucide-react';

export function SidebarNav() {
  const { isActive } = useNavigation();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Navegación</SidebarGroupLabel>
        <SidebarMenu>
          {mainNav.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild isActive={isActive(item.href)}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

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
                                <Link href={`/property/${city.id}/${type.id}/${property.id}`} className={`block text-xs py-1 px-2 rounded-md hover:bg-sidebar-accent ${isActive(`/property/${city.id}/${type.id}/${property.id}`) ? 'bg-sidebar-accent' : ''}`}>
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

      <SidebarSeparator />
      
      <SidebarGroup>
        <SidebarGroupLabel>Módulos de Administración</SidebarGroupLabel>
        <SidebarMenu>
          {adminModules.map((module) => (
            <SidebarMenuItem key={module.id}>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={module.id} className="border-none">
                        <AccordionTrigger className="hover:no-underline [&[data-state=open]>div>svg.chevron]:rotate-180">
                           <div className="flex items-center gap-2 text-sm w-full">
                             <module.icon />
                             <span>{module.name}</span>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8">
                           <ul className="space-y-1">
                            {module.subSections.map(sub => (
                                <li key={sub.id}>
                                <Link href={sub.href} className={`block text-xs py-1 px-2 rounded-md hover:bg-sidebar-accent ${isActive(sub.href) ? 'bg-sidebar-accent' : ''}`}>
                                  {sub.name}
                                </Link>
                               </li>
                            ))}
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

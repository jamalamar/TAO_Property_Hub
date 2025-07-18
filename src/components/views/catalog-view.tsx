
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getAllProperties } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export function CatalogView() {
  const allProperties = getAllProperties();
  const searchParams = useSearchParams();

  const createHrefWithRole = (href: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return `${href}?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Catálogo de Propiedades</h1>
        <p className="text-muted-foreground">Explore nuestro portafolio de activos inmobiliarios.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProperties.map((prop) => (
          <Link href={createHrefWithRole(`/property/${prop.cityId}/${prop.typeId}/${prop.id}`)} key={prop.id} className="group">
            <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-1">
              <CardHeader className="p-0">
                <Image
                  src={`https://placehold.co/600x400.png`}
                  alt={prop.name}
                  width={600}
                  height={400}
                  className="object-cover w-full h-48"
                  data-ai-hint={`${prop.type} exterior`}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg mb-2">{prop.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  <span>{prop.city}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Badge variant="secondary">{prop.type}</Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

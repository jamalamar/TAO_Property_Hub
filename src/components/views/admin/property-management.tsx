
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { AdminViewWrapper } from '../admin-view-wrapper';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllProperties, cities, propertyTypes } from '@/lib/data';
import { PlusCircle, Edit, Trash2, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function PropertyManagement() {
  const { toast } = useToast();
  const [properties, setProperties] = useState(getAllProperties());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const openAddDialog = () => {
    setEditingProperty(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (property: any) => {
    setEditingProperty(property);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (propertyId: string) => {
    // Placeholder for delete functionality
    console.log("Deleting property:", propertyId);
    toast({
        title: "Funcionalidad no implementada",
        description: "La eliminación de propiedades aún no está conectada.",
        variant: "destructive"
    });
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // This is a placeholder. In a real app, you would have an API call here.
    if (editingProperty) {
        console.log("Updating property:", { ...editingProperty, ...data });
        toast({
            title: "Propiedad Actualizada (Simulado)",
            description: `Se ha actualizado la propiedad ${data.name}.`,
        });
    } else {
        console.log("Adding new property:", data);
        toast({
            title: "Propiedad Agregada (Simulado)",
            description: `Se ha agregado la nueva propiedad ${data.name}.`,
        });
    }

    // In a real scenario, you'd refetch or update state here.
    // For now, we'll just close the dialog.
    setIsDialogOpen(false);
  };

  return (
    <AdminViewWrapper
      title="Gestión de Propiedades"
      description="Agrega, edita o elimina propiedades de tu portafolio."
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Propiedad
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleFormSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingProperty ? 'Editar Propiedad' : 'Agregar Nueva Propiedad'}</DialogTitle>
                  <DialogDescription>
                    {editingProperty ? 'Modifica los detalles de la propiedad.' : 'Completa el formulario para agregar una nueva propiedad.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" name="name" defaultValue={editingProperty?.name} placeholder="Ej. Condominos Vista Mar" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cityId">Ciudad</Label>
                     <Select name="cityId" defaultValue={editingProperty?.cityId}>
                        <SelectTrigger><SelectValue placeholder="Selecciona una ciudad" /></SelectTrigger>
                        <SelectContent>
                            {cities.map(city => (
                                <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="typeId">Tipo</Label>
                     <Select name="typeId" defaultValue={editingProperty?.typeId}>
                        <SelectTrigger><SelectValue placeholder="Selecciona un tipo" /></SelectTrigger>
                        <SelectContent>
                            {propertyTypes.map(type => (
                                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">{editingProperty ? 'Guardar Cambios' : 'Agregar Propiedad'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
                <Card key={prop.id} className="flex flex-col">
                    <CardHeader className="p-0 relative">
                        <Image
                          src={`https://placehold.co/600x400.png`}
                          alt={prop.name}
                          width={600}
                          height={400}
                          className="object-cover w-full h-48 rounded-t-lg"
                          data-ai-hint={`${prop.type} exterior`}
                        />
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                        <Badge variant="secondary" className="mb-2">{prop.type}</Badge>
                        <CardTitle className="text-lg mb-1">{prop.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1.5" />
                            <span>{prop.city}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(prop)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(prop.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </AdminViewWrapper>
  );
}

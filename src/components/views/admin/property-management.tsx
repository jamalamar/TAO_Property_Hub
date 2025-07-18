"use client";

import React, { useState } from 'react';
import { AdminViewWrapper } from '../admin-view-wrapper';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input id="name" name="name" defaultValue={editingProperty?.name} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cityId" className="text-right">
                      Ciudad
                    </Label>
                     <Select name="cityId" defaultValue={editingProperty?.cityId}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecciona una ciudad" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map(city => (
                                <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeId" className="text-right">
                      Tipo
                    </Label>
                     <Select name="typeId" defaultValue={editingProperty?.typeId}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
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

        <Card>
            <CardContent className="mt-6">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Ciudad</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {properties.map((prop) => (
                    <TableRow key={prop.id}>
                        <TableCell className="font-medium">{prop.name}</TableCell>
                        <TableCell>{prop.city}</TableCell>
                        <TableCell>{prop.type}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(prop)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(prop.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
    </AdminViewWrapper>
  );
}

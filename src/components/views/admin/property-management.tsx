
"use client";

import React, { useState, useMemo } from 'react';
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
import { PlusCircle, Edit, Trash2, MapPin, User, DollarSign, UserCheck, Ruler } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function PropertyManagement() {
  const { toast } = useToast();
  const allProperties = useMemo(() => getAllProperties(), []);
  const [properties, setProperties] = useState(allProperties);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  // State for filters
  const [cityFilter, setCityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredProperties = useMemo(() => {
    return allProperties.filter(prop => {
        const matchesCity = cityFilter === 'all' || prop.cityId === cityFilter;
        const matchesType = typeFilter === 'all' || prop.typeId === typeFilter;
        const matchesSearch = !searchFilter || 
            prop.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            prop.owner.toLowerCase().includes(searchFilter.toLowerCase()) ||
            (prop.tenant && prop.tenant.toLowerCase().includes(searchFilter.toLowerCase()));
        return matchesCity && matchesType && matchesSearch;
    });
  }, [allProperties, cityFilter, typeFilter, searchFilter]);


  const openAddDialog = () => {
    setEditingProperty(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (property: any) => {
    setEditingProperty(property);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (propertyId: string) => {
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

    setIsDialogOpen(false);
  };

  return (
    <AdminViewWrapper
      title="Gestión de Propiedades"
      description="Filtra, agrega, edita o elimina propiedades de tu portafolio."
    >
      <div className="space-y-6">
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input 
                        placeholder="Buscar por nombre, propietario..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                    <Select value={cityFilter} onValueChange={setCityFilter}>
                        <SelectTrigger><SelectValue placeholder="Filtrar por ciudad" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las ciudades</SelectItem>
                            {cities.map(city => (
                                <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger><SelectValue placeholder="Filtrar por tipo" /></SelectTrigger>
                        <SelectContent>
                             <SelectItem value="all">Todos los tipos</SelectItem>
                            {propertyTypes.map(type => (
                                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>

        <div className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Propiedad
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
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
                    <Input id="name" name="name" defaultValue={editingProperty?.name} placeholder="Ej. Condominios Vista Mar" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cityId">Ciudad</Label>
                     <Select name="cityId" defaultValue={editingProperty?.cityId} required>
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
                     <Select name="typeId" defaultValue={editingProperty?.typeId} required>
                        <SelectTrigger><SelectValue placeholder="Selecciona un tipo" /></SelectTrigger>
                        <SelectContent>
                            {propertyTypes.map(type => (
                                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="owner">Propietario</Label>
                    <Input id="owner" name="owner" defaultValue={editingProperty?.owner} placeholder="Ej. Inversiones TAO" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="cost">Costo</Label>
                    <Input id="cost" name="cost" type="number" defaultValue={editingProperty?.cost} placeholder="Ej. 2500000" required />
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
            {filteredProperties.map((prop) => (
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
                        <Badge variant="secondary" className="absolute top-2 right-2">{prop.type}</Badge>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow space-y-3">
                        <CardTitle className="text-lg">{prop.name}</CardTitle>
                        <div className="text-sm text-muted-foreground space-y-2">
                            <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {prop.city}</div>
                            <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {prop.owner}</div>
                            <div className="flex items-center"><DollarSign className="w-4 h-4 mr-2" /> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(prop.cost)}</div>
                            <div className="flex items-center"><Ruler className="w-4 h-4 mr-2" /> {prop.size}</div>
                            {prop.tenant && <div className="flex items-center"><UserCheck className="w-4 h-4 mr-2" /> {prop.tenant}</div>}
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
            {filteredProperties.length === 0 && (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                    No se encontraron propiedades que coincidan con los filtros.
                </div>
            )}
        </div>
      </div>
    </AdminViewWrapper>
  );
}

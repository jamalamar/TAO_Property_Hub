
"use client";

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getAllProperties, maintenanceRequests as initialRequests, maintenanceStatuses } from '@/lib/data';
import { PlusCircle, Edit } from 'lucide-react';
import { AdminViewWrapper } from '../admin-view-wrapper';
import { cn } from '@/lib/utils';

export function MaintenanceView() {
  const { toast } = useToast();
  const allProperties = useMemo(() => getAllProperties(), []);
  const [requests, setRequests] = useState(initialRequests);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
      return matchesStatus;
    });
  }, [requests, statusFilter]);

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const newRequest = {
        id: `REQ-${String(requests.length + 1).padStart(3, '0')}`,
        propertyId: data.propertyId as string,
        propertyName: allProperties.find(p => p.id === data.propertyId)?.name || 'N/A',
        description: data.description as string,
        status: 'pending',
        reportedDate: new Date().toISOString().split('T')[0],
        assignedTo: data.assignedTo as string || null,
    };

    setRequests(prev => [newRequest, ...prev]);

    toast({
        title: "Solicitud Agregada",
        description: `Se ha creado la solicitud ${newRequest.id}.`,
    });

    setIsAddDialogOpen(false);
  };
  
  const getStatusInfo = (statusId: string) => {
    return maintenanceStatuses.find(s => s.id === statusId) || { name: 'Desconocido', className: 'bg-gray-100 text-gray-800 border-gray-200' };
  }

  return (
    <AdminViewWrapper
      title="Gestión de Mantenimiento"
      description="Visualiza y gestiona todas las solicitudes de mantenimiento para tus propiedades."
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <div className="w-1/3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger><SelectValue placeholder="Filtrar por estatus" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los Estatus</SelectItem>
                        {maintenanceStatuses.map(status => (
                            <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar Solicitud
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleAddSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nueva Solicitud de Mantenimiento</DialogTitle>
                        <DialogDescription>
                            Completa los detalles para crear una nueva solicitud.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="propertyId">Propiedad</Label>
                        <Select name="propertyId" required>
                            <SelectTrigger><SelectValue placeholder="Selecciona una propiedad" /></SelectTrigger>
                            <SelectContent>
                                {allProperties.map(prop => (
                                    <SelectItem key={prop.id} value={prop.id}>{prop.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción del Problema</Label>
                        <Textarea id="description" name="description" placeholder="Ej. Fuga en el grifo de la cocina..." required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="assignedTo">Asignado a (Opcional)</Label>
                        <Input id="assignedTo" name="assignedTo" placeholder="Ej. Plomería Express" />
                    </div>
                    </div>
                    <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Crear Solicitud</Button>
                    </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>
        </div>

        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Propiedad</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estatus</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredRequests.map((req) => {
                        const statusInfo = getStatusInfo(req.status);
                        return (
                            <TableRow key={req.id}>
                                <TableCell className="font-medium">{req.id}</TableCell>
                                <TableCell>{req.propertyName}</TableCell>
                                <TableCell className="max-w-xs truncate">{req.description}</TableCell>
                                <TableCell>{req.reportedDate}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn("font-semibold", statusInfo.className)}>
                                        {statusInfo.name}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Editar</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                     {filteredRequests.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No se encontraron solicitudes.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
      </div>
    </AdminViewWrapper>
  );
}

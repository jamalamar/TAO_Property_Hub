
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
import { Textarea } from '@/components/ui/textarea';
import { getAllProperties } from '@/lib/data';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const initialReports = [
    { id: 'REP001', propertyId: 'tienda-centro', description: 'Fuga en el baño de empleados.', status: 'Nuevo', date: '2024-07-20' },
    { id: 'REP002', propertyId: 'laguna-suites', description: 'Aire acondicionado de la unidad 12 no enfría.', status: 'En Progreso', date: '2024-07-19' },
    { id: 'REP003', propertyId: 'villa-zicatela', description: 'Pintura exterior descascarada en la fachada norte.', status: 'Resuelto', date: '2024-07-15' },
    { id: 'REP004', propertyId: 'oficinas-puerto', description: 'Falla en elevador principal.', status: 'Nuevo', date: '2024-07-21' },
];

const statusVariants: { [key: string]: "default" | "secondary" | "outline" | "destructive" | null | undefined } = {
  'Nuevo': 'destructive',
  'En Progreso': 'default',
  'Resuelto': 'secondary',
};

export function EstimatesView() {
    const { toast } = useToast();
    const [reports, setReports] = useState(initialReports);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingReport, setEditingReport] = useState<any>(null);
    const allProperties = getAllProperties();

    const getPropertyName = (propertyId: string) => {
        return allProperties.find(p => p.id === propertyId)?.name || 'N/A';
    };
    
    const openAddDialog = () => {
        setEditingReport(null);
        setIsDialogOpen(true);
    };

    const openEditDialog = (report: any) => {
        setEditingReport(report);
        setIsDialogOpen(true);
    };

    const handleDelete = (reportId: string) => {
        toast({
            title: "Funcionalidad no implementada",
            description: "La eliminación de reportes aún no está conectada.",
            variant: "destructive"
        });
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        if (editingReport) {
            console.log("Updating report:", { ...editingReport, ...data });
            toast({
                title: "Reporte Actualizado (Simulado)",
                description: `Se ha actualizado el reporte ${editingReport.id}.`,
            });
        } else {
            const newId = `REP${(reports.length + 1).toString().padStart(3, '0')}`;
            console.log("Adding new report:", { id: newId, ...data });
            toast({
                title: "Reporte Creado (Simulado)",
                description: `Se ha creado el nuevo reporte ${newId}.`,
            });
        }
        setIsDialogOpen(false);
    };

    return (
        <AdminViewWrapper
            title="Gestión de Reportes de Mantenimiento"
            description="Crea, visualiza y gestiona los reportes de mantenimiento de las propiedades."
        >
            <div className="space-y-6">
                <div className="flex justify-end">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openAddDialog}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Levantar Reporte
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <form onSubmit={handleFormSubmit}>
                                <DialogHeader>
                                    <DialogTitle>{editingReport ? 'Editar Reporte' : 'Levantar Nuevo Reporte'}</DialogTitle>
                                    <DialogDescription>
                                        {editingReport ? 'Modifica los detalles del reporte.' : 'Completa el formulario para crear un nuevo reporte.'}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="propertyId">Propiedad</Label>
                                        <Select name="propertyId" defaultValue={editingReport?.propertyId} required>
                                            <SelectTrigger><SelectValue placeholder="Selecciona una propiedad" /></SelectTrigger>
                                            <SelectContent>
                                                {allProperties.map(prop => (
                                                    <SelectItem key={prop.id} value={prop.id}>{prop.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea id="description" name="description" defaultValue={editingReport?.description} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Estatus</Label>
                                        <Select name="status" defaultValue={editingReport?.status || 'Nuevo'} required>
                                            <SelectTrigger><SelectValue placeholder="Selecciona un estatus" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Nuevo">Nuevo</SelectItem>
                                                <SelectItem value="En Progreso">En Progreso</SelectItem>
                                                <SelectItem value="Resuelto">Resuelto</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                                    <Button type="submit">{editingReport ? 'Guardar Cambios' : 'Crear Reporte'}</Button>
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
                                    <TableHead>ID</TableHead>
                                    <TableHead>Propiedad</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Estatus</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports.map((report) => (
                                    <TableRow key={report.id}>
                                        <TableCell className="font-medium">{report.id}</TableCell>
                                        <TableCell>{getPropertyName(report.propertyId)}</TableCell>
                                        <TableCell className="max-w-xs truncate">{report.description}</TableCell>
                                        <TableCell>{report.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariants[report.status]}>{report.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(report)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(report.id)}>
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

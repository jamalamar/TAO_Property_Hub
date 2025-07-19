
"use client";

import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProperties } from '@/lib/data';
import { cn } from '@/lib/utils';

const paymentStatusConfig = {
    paid: { label: 'Pagado', className: 'bg-green-100 text-green-800 border-green-200' },
    pending: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    late: { label: 'Atrasado', className: 'bg-red-100 text-red-800 border-red-200' },
};

type PaymentStatus = keyof typeof paymentStatusConfig;

export function AssetsForRentView() {
  const allProperties = useMemo(() => getAllProperties(), []);
  const rentedProperties = useMemo(() => allProperties.filter(p => p.tenant && p.tenant !== 'N/A' && p.rentAmount), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestor de Activos en Renta</CardTitle>
        <CardDescription>
          Supervisa el estado de los pagos de todas tus propiedades arrendadas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propiedad</TableHead>
                <TableHead>Inquilino</TableHead>
                <TableHead>Monto de Renta</TableHead>
                <TableHead>Fecha de Vencimiento</TableHead>
                <TableHead className="text-center">Estatus de Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentedProperties.length > 0 ? (
                rentedProperties.map((prop) => {
                  const status = (prop.paymentStatus as PaymentStatus) || 'pending';
                  const config = paymentStatusConfig[status];
                  return (
                    <TableRow key={prop.id}>
                      <TableCell className="font-medium">{prop.name}</TableCell>
                      <TableCell>{prop.tenant}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(prop.rentAmount)}
                      </TableCell>
                      <TableCell>
                        {format(new Date(prop.paymentDueDate), 'dd MMMM, yyyy', { locale: es })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("font-semibold", config.className)}>
                          {config.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No hay propiedades en renta actualmente.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

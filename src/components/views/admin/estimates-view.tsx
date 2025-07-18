
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Wrench } from 'lucide-react';
import { AdminViewWrapper } from '../admin-view-wrapper';

export function EstimatesView() {
    const [description, setDescription] = useState('');
    const [estimate, setEstimate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!description.trim()) {
            toast({
                title: 'Descripción vacía',
                description: 'Por favor, describe el trabajo de mantenimiento.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        setEstimate(null);

        // Simular una llamada a la IA
        setTimeout(() => {
            const cost = (Math.random() * 5000 + 500).toFixed(2);
            const time = Math.ceil(Math.random() * 10);
            const simulatedEstimate = `Estimación de Costo: $${cost} MXN\nTiempo Estimado: ${time} días hábiles\n\nDesglose (simulado):\n- Materiales: $${(parseFloat(cost) * 0.6).toFixed(2)}\n- Mano de Obra: $${(parseFloat(cost) * 0.4).toFixed(2)}\n\nNota: Esta es una estimación preliminar.`;
            setEstimate(simulatedEstimate);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <AdminViewWrapper
            title="Estimador de Mantenimiento con IA"
            description="Describe un trabajo de mantenimiento para recibir una estimación de costo y tiempo (Simulado)."
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Descripción del Trabajo</label>
                    <Textarea
                        id="description"
                        placeholder="Ej: 'Reparar filtración en el techo de la bodega principal, aproximadamente 10m².'"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                    />
                </div>

                <Button type="submit" disabled={isLoading}>
                    <Wrench className="mr-2 h-4 w-4" />
                    {isLoading ? 'Estimando...' : 'Generar Estimación'}
                </Button>
            </form>

            {isLoading && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Estimación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                </Card>
            )}

            {estimate && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Estimación de Mantenimiento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm whitespace-pre-wrap font-body">{estimate}</p>
                    </CardContent>
                </Card>
            )}
        </AdminViewWrapper>
    );
}

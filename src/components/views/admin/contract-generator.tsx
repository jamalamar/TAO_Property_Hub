
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { jsPDF } from "jspdf";

import { generateContract } from '@/ai/flows/generate-contract-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Download, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllProperties } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  landlordName: z.string().min(3, "El nombre del arrendador es requerido."),
  tenantName: z.string().min(3, "El nombre del arrendatario es requerido."),
  propertyId: z.string({ required_error: "Debe seleccionar una propiedad." }),
  startDate: z.date({ required_error: "La fecha de inicio es requerida." }),
  endDate: z.date({ required_error: "La fecha de fin es requerida." }),
  rentAmount: z.coerce.number().min(1, "El monto de la renta debe ser mayor a 0."),
});

type ContractFormValues = z.infer<typeof formSchema>;

export function ContractGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const { toast } = useToast();
  const allProperties = getAllProperties();

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landlordName: '',
      tenantName: '',
    },
  });

  const onSubmit = async (data: ContractFormValues) => {
    setIsLoading(true);
    setGeneratedContract(null);

    const selectedProperty = allProperties.find(p => p.id === data.propertyId);
    if (!selectedProperty) {
      toast({
        title: "Error",
        description: "La propiedad seleccionada no es válida.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const input = {
        ...data,
        propertyAddress: `${selectedProperty.name}, ${selectedProperty.city}`,
        startDate: format(data.startDate, "PPP", { locale: es }),
        endDate: format(data.endDate, "PPP", { locale: es }),
        rentAmount: data.rentAmount,
      };
      
      const result = await generateContract(input);
      setGeneratedContract(result.contractText);

    } catch (error) {
      console.error("La generación del contrato falló:", error);
      toast({
        title: 'Falló la Generación del Contrato',
        description: 'Ocurrió un error al generar el contrato.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!generatedContract) return;
    const doc = new jsPDF();
    
    doc.setFont("helvetica");
    doc.setFontSize(12);
    
    // Simple text split to handle page breaks
    const textLines = doc.splitTextToSize(generatedContract, 180);
    doc.text(textLines, 15, 20);

    doc.save("contrato-arrendamiento.pdf");
  };


  return (
    <div className="space-y-6">
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="landlordName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nombre del Arrendador</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. Juan Pérez" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tenantName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nombre del Arrendatario</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. María García" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="propertyId"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Propiedad</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una propiedad" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {allProperties.map(prop => (
                                        <SelectItem key={prop.id} value={prop.id}>{prop.name}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="rentAmount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Monto de Renta Mensual (MXN)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Ej. 10000" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Fecha de Inicio del Contrato</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP", { locale: es })
                                            ) : (
                                                <span>Selecciona una fecha</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date("1900-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Fecha de Fin del Contrato</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP", { locale: es })
                                            ) : (
                                                <span>Selecciona una fecha</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date("1900-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generando...
                        </>
                    ) : (
                       "Generar Contrato"
                    )}
                    </Button>
                </form>
                </Form>
            </CardContent>
        </Card>

        {generatedContract && (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1.5">
                        <CardTitle>Borrador del Contrato Generado</CardTitle>
                        <CardDescription>Revisa el contrato generado. Puedes descargarlo como PDF.</CardDescription>
                    </div>
                    <Button onClick={downloadPdf} variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Descargar PDF</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm max-w-none p-4 border rounded-md h-96 overflow-y-auto bg-muted/20">
                        <p className="whitespace-pre-wrap font-code">{generatedContract}</p>
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}

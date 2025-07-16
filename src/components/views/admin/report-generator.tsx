"use client";

import React, { useState } from 'react';
import { generateReportFromDocuments } from '@/ai/flows/generate-report-from-documents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { FileUp, FileText } from 'lucide-react';
import { AdminViewWrapper } from '../admin-view-wrapper';

export function ReportGenerator() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [instructions, setInstructions] = useState('');
  const [result, setResult] = useState<{ summary: string; report: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
      setResult(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files || files.length === 0) {
      toast({
        title: 'No hay archivos seleccionados',
        description: 'Por favor, seleccione uno o más documentos para generar un informe.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
        const fileToDataUri = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        }
        
        const documentDataUris = await Promise.all(Array.from(files).map(fileToDataUri));

        const response = await generateReportFromDocuments({ 
            documentDataUris,
            reportInstructions: instructions
        });
        setResult(response);

    } catch (error) {
        console.error('La generación del informe falló:', error);
        toast({
          title: 'Falló la Generación del Informe',
          description: 'Ocurrió un error al generar el informe.',
          variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AdminViewWrapper
        title="Generador de Informes con IA"
        description="Sube múltiples documentos y proporciona instrucciones para generar un informe coherente."
    >
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="files" className="text-sm font-medium">Documentos</label>
                <Input id="files" type="file" multiple onChange={handleFileChange} />
            </div>
            
            <div className="space-y-2">
                <label htmlFor="instructions" className="text-sm font-medium">Instrucciones del Informe (Opcional)</label>
                <Textarea 
                    id="instructions"
                    placeholder="p. ej., 'Concéntrese en los plazos y condiciones de pago.'"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
            </div>
            
            <Button type="submit" disabled={isLoading || !files}>
                <FileUp className="mr-2 h-4 w-4" />
                {isLoading ? 'Generando...' : 'Generar Informe'}
            </Button>
        </form>

        {isLoading && (
        <div className="space-y-6 mt-6">
            <Card>
                <CardHeader><CardTitle>Resumen</CardTitle></CardHeader>
                <CardContent className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" /></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Informe</CardTitle></CardHeader>
                <CardContent className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></CardContent>
            </Card>
        </div>
        )}

        {result && (
        <div className="space-y-6 mt-6">
            <Card>
                <CardHeader><CardTitle>Resumen</CardTitle></CardHeader>
                <CardContent><p className="text-sm whitespace-pre-wrap font-body">{result.summary}</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Informe</CardTitle></CardHeader>
                <CardContent><p className="text-sm whitespace-pre-wrap font-body">{result.report}</p></CardContent>
            </Card>
        </div>
        )}
    </AdminViewWrapper>
  );
}

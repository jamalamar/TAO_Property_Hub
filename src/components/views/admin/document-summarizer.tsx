"use client";

import React, { useState } from 'react';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { FileUp, FileText } from 'lucide-react';

export function DocumentSummarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSummary(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: 'No se ha seleccionado ningún archivo',
        description: 'Por favor, seleccione un documento para resumir.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSummary(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const documentDataUri = reader.result as string;
        const result = await summarizeDocument({ documentDataUri });
        setSummary(result.summary);
      } catch (error) {
        console.error('La sumarización falló:', error);
        toast({
          title: 'Falló la Sumarización',
          description: 'Ocurrió un error al resumir el documento.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        toast({
            title: 'Error al Leer el Archivo',
            description: 'No se pudo leer el archivo seleccionado.',
            variant: 'destructive',
        });
        setIsLoading(false);
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Sumarizador de Documentos con IA</CardTitle>
            <CardDescription>Sube un documento legal (p. ej., PDF, DOCX) para generar un resumen conciso de sus detalles clave.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <Input type="file" onChange={handleFileChange} className="flex-1" />
                <Button type="submit" disabled={isLoading || !file}>
                    <FileUp className="mr-2 h-4 w-4" />
                    {isLoading ? 'Resumiendo...' : 'Resumir'}
                </Button>
                </form>

                {isLoading && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText />
                            <span>Resumen</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                </Card>
                )}

                {summary && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText />
                            <span>Resumen</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm whitespace-pre-wrap font-body">{summary}</p>
                    </CardContent>
                </Card>
                )}
          </div>
        </CardContent>
    </Card>
  );
}

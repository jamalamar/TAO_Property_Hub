
"use client";

import { DocumentSummarizer } from '@/components/views/admin/document-summarizer';
import { ReportGenerator } from '@/components/views/admin/report-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LegalView() {
    return (
        <Tabs defaultValue="summarizer">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summarizer">Sumarizador de Documentos</TabsTrigger>
                <TabsTrigger value="report-generator">Generador de Informes</TabsTrigger>
            </TabsList>
            <TabsContent value="summarizer">
                <DocumentSummarizer />
            </TabsContent>
            <TabsContent value="report-generator">
                <ReportGenerator />
            </TabsContent>
        </Tabs>
    )
}

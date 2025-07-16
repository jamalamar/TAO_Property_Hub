"use client";

import React, { useState } from 'react';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { FileUp, FileText } from 'lucide-react';
import { AdminViewWrapper } from '../admin-view-wrapper';

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
        title: 'No file selected',
        description: 'Please select a document to summarize.',
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
        console.error('Summarization failed:', error);
        toast({
          title: 'Summarization Failed',
          description: 'An error occurred while summarizing the document.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        toast({
            title: 'File Read Error',
            description: 'Could not read the selected file.',
            variant: 'destructive',
        });
        setIsLoading(false);
    }
  };

  return (
    <AdminViewWrapper
        title="AI Document Summarizer"
        description="Upload a legal document (e.g., PDF, DOCX) to generate a concise summary of its key details."
    >
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Input type="file" onChange={handleFileChange} className="flex-1" />
            <Button type="submit" disabled={isLoading || !file}>
                <FileUp className="mr-2 h-4 w-4" />
                {isLoading ? 'Summarizing...' : 'Summarize'}
            </Button>
            </form>

            {isLoading && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText />
                        <span>Summary</span>
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
                        <span>Summary</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm whitespace-pre-wrap font-body">{summary}</p>
                </CardContent>
            </Card>
            )}
      </div>
    </AdminViewWrapper>
  );
}

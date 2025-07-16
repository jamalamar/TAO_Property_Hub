'use server';
/**
 * @fileOverview An AI agent that summarizes uploaded documents and generates concise reports when appropriate.
 *
 * - generateReportFromDocuments - A function that handles the document summarization and report generation process.
 * - GenerateReportFromDocumentsInput - The input type for the generateReportFromDocuments function.
 * - GenerateReportFromDocumentsOutput - The return type for the generateReportFromDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportFromDocumentsInputSchema = z.object({
  documentDataUris: z
    .array(z.string())
    .describe(
      "An array of documents, as data URIs that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  reportInstructions: z
    .string()
    .optional()
    .describe('Instructions for the AI on what to focus on in the report.'),
});
export type GenerateReportFromDocumentsInput = z.infer<
  typeof GenerateReportFromDocumentsInputSchema
>;

const GenerateReportFromDocumentsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the documents.'),
  report: z.string().describe('A report generated from the documents, if appropriate.'),
});
export type GenerateReportFromDocumentsOutput = z.infer<
  typeof GenerateReportFromDocumentsOutputSchema
>;

export async function generateReportFromDocuments(
  input: GenerateReportFromDocumentsInput
): Promise<GenerateReportFromDocumentsOutput> {
  return generateReportFromDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportFromDocumentsPrompt',
  input: {schema: GenerateReportFromDocumentsInputSchema},
  output: {schema: GenerateReportFromDocumentsOutputSchema},
  prompt: `You are an AI assistant that analyzes documents and generates concise reports.

  You will be provided with a list of documents, and your task is to summarize the key details from these documents and generate a concise report, when appropriate.

  Instructions: {{{reportInstructions}}}

  Documents:
  {{#each documentDataUris}}
  Document {{@index}}: {{media url=this}}
  {{/each}}

  Summary: {{summary}}
  Report: {{report}}`,
});

const generateReportFromDocumentsFlow = ai.defineFlow(
  {
    name: 'generateReportFromDocumentsFlow',
    inputSchema: GenerateReportFromDocumentsInputSchema,
    outputSchema: GenerateReportFromDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

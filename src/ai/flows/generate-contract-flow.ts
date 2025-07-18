
'use server';
/**
 * @fileOverview Un agente de IA que genera contratos de arrendamiento.
 *
 * - generateContract - Una función que maneja la generación de contratos.
 * - GenerateContractInput - El tipo de entrada para la función generateContract.
 * - GenerateContractOutput - El tipo de retorno para la función generateContract.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContractInputSchema = z.object({
  landlordName: z.string().describe('El nombre completo del arrendador.'),
  tenantName: z.string().describe('El nombre completo del arrendatario.'),
  propertyAddress: z.string().describe('La dirección completa de la propiedad en alquiler.'),
  startDate: z.string().describe('La fecha de inicio del contrato.'),
  endDate: z.string().describe('La fecha de finalización del contrato.'),
  rentAmount: z.number().describe('El monto de la renta mensual en pesos mexicanos (MXN).'),
});
export type GenerateContractInput = z.infer<typeof GenerateContractInputSchema>;

const GenerateContractOutputSchema = z.object({
  contractText: z.string().describe('El texto completo del contrato de arrendamiento generado.'),
});
export type GenerateContractOutput = z.infer<typeof GenerateContractOutputSchema>;

export async function generateContract(input: GenerateContractInput): Promise<GenerateContractOutput> {
  return generateContractFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContractPrompt',
  input: {schema: GenerateContractInputSchema},
  output: {schema: GenerateContractOutputSchema},
  prompt: `Actúa como un abogado experto en derecho inmobiliario en México.
Tu tarea es generar un contrato de arrendamiento residencial simple basado en los siguientes detalles.
El contrato debe estar en español, ser claro, conciso y seguir las prácticas legales estándar en México.

Detalles del Contrato:
- Arrendador: {{{landlordName}}}
- Arrendatario: {{{tenantName}}}
- Dirección de la Propiedad: {{{propertyAddress}}}
- Fecha de Inicio: {{{startDate}}}
- Fecha de Fin: {{{endDate}}}
- Renta Mensual: $\{{"{{rentAmount}}"}} MXN

Incluye cláusulas estándar sobre:
1.  Objeto del contrato.
2.  Renta y forma de pago (especificar que se paga en los primeros 5 días de cada mes).
3.  Depósito en garantía (equivalente a un mes de renta).
4.  Uso del inmueble (exclusivamente para uso habitacional).
5.  Mantenimiento y reparaciones.
6.  Servicios (luz, agua, gas, etc., a cargo del arrendatario).
7.  Causas de rescisión del contrato.
8.  Jurisdicción (tribunales de la ciudad donde se ubica el inmueble).

Finaliza con líneas para las firmas del Arrendador, Arrendatario y un Testigo.
Asegúrate de que el formato sea limpio y profesional. No incluyas comentarios, solo el texto del contrato.`,
});

const generateContractFlow = ai.defineFlow(
  {
    name: 'generateContractFlow',
    inputSchema: GenerateContractInputSchema,
    outputSchema: GenerateContractOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

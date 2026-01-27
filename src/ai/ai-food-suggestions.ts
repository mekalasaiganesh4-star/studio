'use server';
/**
 * @fileOverview An AI agent that provides personalized food suggestions based on user preferences and past orders.
 *
 * - getFoodSuggestions - A function that handles the food suggestion process.
 * - FoodSuggestionsInput - The input type for the getFoodSuggestions function.
 * - FoodSuggestionsOutput - The return type for the getFoodSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FoodSuggestionsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user food preferences such as dietary restrictions and favored cuisines.'),
  pastOrders: z
    .string()
    .describe('The user past orders history as a JSON array of food names.'),
});

export type FoodSuggestionsInput = z.infer<typeof FoodSuggestionsInputSchema>;

const FoodSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A JSON array of suggested food items based on user preferences and past orders.'),
  reason: z
    .string()
    .describe('A brief explanation of why these food items were suggested.'),
});

export type FoodSuggestionsOutput = z.infer<typeof FoodSuggestionsOutputSchema>;

export async function getFoodSuggestions(input: FoodSuggestionsInput): Promise<FoodSuggestionsOutput> {
  return foodSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'foodSuggestionsPrompt',
  input: {schema: FoodSuggestionsInputSchema},
  output: {schema: FoodSuggestionsOutputSchema},
  prompt: `You are a food suggestion expert. Based on the user's preferences and past orders, suggest food items available on WasteLess Feast.

User Preferences: {{{userPreferences}}}
Past Orders: {{{pastOrders}}}

Suggest food items available on WasteLess Feast in JSON format, and provide a brief explanation of why these items were suggested.\nMake sure JSON is a valid JSON array of strings.`,
});

const foodSuggestionsFlow = ai.defineFlow(
  {
    name: 'foodSuggestionsFlow',
    inputSchema: FoodSuggestionsInputSchema,
    outputSchema: FoodSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

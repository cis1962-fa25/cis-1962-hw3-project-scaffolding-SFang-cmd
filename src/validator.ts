import { z } from 'zod';
import { ValidationResult } from './types';

const FORBIDDEN_TOPPINGS = ['anchovies', 'olives', 'peanuts', 'pineapples'];

const pizzaSchema = z.object({
  size: z.number().positive('Pizza must have a positive size'),
  crust: z.enum(['stuffed', 'normal'], {
    errorMap: () => ({ message: 'Crust must be "stuffed" or "normal"' }),
  }),
  isDeepDish: z.boolean().optional().default(false),
  toppings: z
    .array(
      z.string().refine(
        (topping) => !FORBIDDEN_TOPPINGS.includes(topping.toLowerCase()),
        (topping) => ({ message: `Topping "${topping}" is forbidden` })
      )
    )
    .optional(),
});

export function validatePizza(input: unknown): ValidationResult {
  const result = pizzaSchema.safeParse(input);
  if (result.success) {
    return {
      isPizza: true,
      pizza: result.data,
    };
  }

  const errorMessages = result.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');
  return {
    isPizza: false,
    errors: errorMessages,
  };
}

export interface Pizza {
  size: number;
  crust: 'stuffed' | 'normal';
  isDeepDish?: boolean;
  toppings?: string[];
}

export type ValidationResult = { isPizza: true; pizza: Pizza } | { isPizza: false; errors: string };

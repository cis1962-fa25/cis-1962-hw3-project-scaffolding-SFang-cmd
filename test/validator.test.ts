import { validatePizza } from '../src/validator';

describe('Pizza Validator', () => {
  test('validates a correct pizza', () => {
    const validPizza = {
      size: 14,
      crust: 'normal',
      isDeepDish: false,
      toppings: ['cheese', 'pepperoni', 'mushrooms'],
    };

    const result = validatePizza(validPizza);

    expect(result.isPizza).toBe(true);
    if (result.isPizza) {
      expect(result.pizza.size).toBe(14);
      expect(result.pizza.crust).toBe('normal');
    }
  });

  test('rejects pizza with invalid crust type', () => {
    const invalidPizza = {
      size: 12,
      crust: 'thin',
      toppings: ['cheese'],
    };

    const result = validatePizza(invalidPizza);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors).toContain('crust');
    }
  });

  test('rejects pizza with forbidden toppings', () => {
    const invalidPizza = {
      size: 16,
      crust: 'stuffed',
      toppings: ['cheese', 'pineapples'],
    };

    const result = validatePizza(invalidPizza);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors).toContain('pineapples');
    }
  });

  test('rejects pizza with negative size', () => {
    const invalidPizza = {
      size: -10,
      crust: 'normal',
    };

    const result = validatePizza(invalidPizza);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors).toContain('positive');
    }
  });
});
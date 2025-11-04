# Pizza Validator

A TypeScript package for validating pizza objects against a strict schema using Zod.

## Installation

Install the package as a dependency:

```bash
npm install pizza-validator
```

For global CLI access:

```bash
npm install --global pizza-validator
```

## Usage as a Dependency

Import and use the `validatePizza` function to check whether an object conforms to the pizza schema:

```typescript
import { validatePizza } from 'pizza-validator';

const result = validatePizza({
  size: 14,
  crust: 'normal',
  isDeepDish: false,
  toppings: ['cheese', 'pepperoni', 'mushrooms']
});

if (result.isPizza) {
  console.log('Valid pizza!');
  console.log(result.pizza);
} else {
  console.log('Validation failed:', result.errors);
}
```

The function returns a discriminated union:

- Success: `{ isPizza: true, pizza: Pizza }`
- Failure: `{ isPizza: false, errors: string }`

## CLI Usage

After global installation, validate JSON files directly from the command line:

```bash
pizza-validator my-pizza.json
```

**Example valid pizza file (`valid-pizza.json`):**

```json
{
  "size": 16,
  "crust": "stuffed",
  "isDeepDish": true,
  "toppings": ["cheese", "pepperoni", "olives"]
}
```

**CLI output for valid pizza:**

```bash
✓ Valid pizza!
Size: 16" diameter
Crust: stuffed
Deep dish: true
Toppings: cheese, pepperoni, olives
```

**CLI output for invalid pizza:**

```bash
✗ Invalid pizza!
Reasons: toppings.1: "pineapple" is not allowed on pizza
```

## Pizza Schema

A valid pizza object must satisfy these constraints:

- **`size`** (number, required): Pizza diameter in inches. Must be positive.
- **`crust`** (string, required): Either `"stuffed"` or `"normal"`.
- **`isDeepDish`** (boolean, optional): Defaults to `false` if omitted.
- **`toppings`** (array of strings, optional): List of toppings. Cannot include: `pineapple`, `anchovies`, `candy`, or `pickles`.

## Development

Clone the repository and install dependencies:

```bash
npm install
```

**Build the project:**

```bash
npm run build
```

**Run tests:**

```bash
npm test
```

**Lint code:**

```bash
npm run lint
```

**Format code:**

```bash
npm run format
```

## License

ISC - See [LICENSE](LICENSE) file for details.

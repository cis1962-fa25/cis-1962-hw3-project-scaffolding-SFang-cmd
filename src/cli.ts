import { readFileSync } from "fs";
import { parseArgs } from "util";
import { validatePizza } from "./validator";

const { positionals } = parseArgs({
    allowPositionals: true,
});

if (positionals.length !== 1) {
    console.error("Error: Please provide a path to a JSON file only.");
    console.error("Usage: pizza-validator <file.json>")
    process.exit(1);
}

const filePath = positionals[0] as string;

try {
    const fileContent = readFileSync(filePath, "utf-8");
    const pizza = JSON.parse(fileContent);
    const result = validatePizza(pizza);

    if (result.isPizza) {
        console.log("Valid pizza!");
        console.log(`Size: ${result.pizza.size}`);
        console.log(`Crust: ${result.pizza.crust}`);
        console.log(`Deep dish: ${result.pizza.isDeepDish ?? false}`)
        if (result.pizza.toppings) {
            console.log(`Toppings: ${result.pizza.toppings.join(", ")}`);
        }
    } else {
        console.error("Invalid pizza:", result.errors);
        process.exit(1);
    }
} catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        console.error("Error reading file:", "File not found");
    } else if ((error as NodeJS.ErrnoException).code === "EISDIR") {
        console.error("Error reading file:", "Is a directory");
    } else {
        console.error("Error reading file:", (error as Error).message);
    }
    process.exit(1);
}
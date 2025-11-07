import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ingredients = [
    "tomato", "lemon", "potato", "rice", "ketchup", "lettuce", "onion", "cheese", "meat", "chicken"
];

async function main() {
    await prisma.recipeItem.deleteMany();
    await prisma.recipe.deleteMany();

    const recipes = [
        {
            name: "lemonChicken",
            items: [
                { ingredient: "chicken", qtyRequired: 1 },
                { ingredient: "lemon", qtyRequired: 2 },
                { ingredient: "rice", qtyRequired: 1 }
            ]
        },
        {
            name: "cheeseBurger",
            items: [
                { ingredient: "meat", qtyRequired: 1 },
                { ingredient: "cheese", qtyRequired: 1 },
                { ingredient: "onion", qtyRequired: 1 },
                { ingredient: "ketchup", qtyRequired: 1 }
            ]
        },
        {
            name: "chickenSalad",
            items: [
                { ingredient: "chicken", qtyRequired: 1 },
                { ingredient: "lettuce", qtyRequired: 2 },
                { ingredient: "tomato", qtyRequired: 1 }
            ]
        },
        {
            name: "veggieRice",
            items: [
                { ingredient: "rice", qtyRequired: 2 },
                { ingredient: "tomato", qtyRequired: 1 },
                { ingredient: "onion", qtyRequired: 1 }
            ]
        },
        {
            name: "potatoCheese",
            items: [
                { ingredient: "potato", qtyRequired: 2 },
                { ingredient: "cheese", qtyRequired: 1 }
            ]
        },
        {
            name: "meatAndPotato",
            items: [
                { ingredient: "meat", qtyRequired: 1 },
                { ingredient: "potato", qtyRequired: 2 },
                { ingredient: "onion", qtyRequired: 1 }
            ]
        }
    ];

    // sanity: ingredientes válidos
    for (const r of recipes) {
        for (const i of r.items) {
            if (!ingredients.includes(i.ingredient)) throw new Error(`Invalid ingredient: ${i.ingredient}`);
        }
    }

    for (const r of recipes) {
        await prisma.recipe.create({
            data: {
                name: r.name,
                items: { create: r.items }
            }
        });
    }
    console.log("Recipes seeded");
}

main().finally(() => prisma.$disconnect());

// src/infrastructure/mappers/RecipeMapper.ts

import { Recipe, RecipeItem } from "../../domain/entities/Recipe.js";


type PrismaRecipeWithItems = Recipe & { items: RecipeItem[] };

export const RecipeMapper = {
    toDomain(row: PrismaRecipeWithItems): Recipe {
        return {
            id: row.id,
            name: row.name,
            createdAt: row.createdAt,
            items: row.items.map((i: any) => ({
                ingredient: i.ingredient,
                qtyRequired: i.qtyRequired,
            })),
        };
    },
};

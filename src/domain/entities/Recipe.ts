// src/domain/entities/Recipe.ts
export interface RecipeItem {
    ingredient: string;
    qtyRequired: number;
}

export interface Recipe {
    id: string;
    name: string;
    items: RecipeItem[];
    createdAt: Date;
}

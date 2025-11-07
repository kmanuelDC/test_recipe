// src/application/dto/RecipeDTO.ts
export type RecipeItemDTO = {
    ingredient: string;
    qtyRequired: number;
};

export type RecipeDTO = {
    id: string;
    name: string;
    items: RecipeItemDTO[];
};

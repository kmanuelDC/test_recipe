// src/domain/repositories/RecipeRepository.ts

import { Recipe } from "../entities/Recipe.js";


export interface RecipeRepository {
    findAll(): Promise<Recipe[]>;
    findById(id: string): Promise<Recipe | null>;
}

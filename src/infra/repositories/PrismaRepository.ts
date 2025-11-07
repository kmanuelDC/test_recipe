// src/infrastructure/repositories/PrismaRecipeRepository.ts

import { prisma } from "../../../prisma/prismaClient.js";
import { Recipe } from "../../domain/entities/Recipe.js";
import { RecipeRepository } from "../../domain/repositories/RecipeRepository.js";
import { RecipeMapper } from "../mappers/RecipeMapper.js";


export class PrismaRecipeRepository implements RecipeRepository {
    async findAll(): Promise<Recipe[]> {
        const rows = await prisma.recipe.findMany({ include: { items: true } });
        return rows.map(RecipeMapper.toDomain);
    }

    async findById(id: string): Promise<Recipe | null> {
        const row = await prisma.recipe.findUnique({ where: { id }, include: { items: true } });
        return row ? RecipeMapper.toDomain(row) : null;
    }
}

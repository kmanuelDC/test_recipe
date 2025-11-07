// prisma/prismaClient.ts
import { PrismaClient } from "@prisma/client";

declare global {
    var __prisma__: PrismaClient | undefined;
}

export const prisma =
    global.__prisma__ ??
    new PrismaClient({
        log: [{ emit: "event", level: "query" }, { emit: "event", "level": "error" }],
    });

export const Recipe = prisma.recipe;
export const RecipeItem = prisma.recipeItem;

if (process.env.NODE_ENV !== "production") global.__prisma__ = prisma;

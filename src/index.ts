


import Fastify from "fastify";
import { PrismaRecipeRepository } from "./infra/repositories/PrismaRepository.js";
import { ListRecipes } from "./application/usecase/ListRecipes.js";
import { registerRecipeRoutes } from "./interfaces/http/recipeRoutes.js";

async function main() {
    const app = Fastify({ logger: true });
    app.get("/health", async () => ({ ok: true, service: "recipe" }));

    const recipeRepo = new PrismaRecipeRepository();
    const listRecipes = new ListRecipes(recipeRepo);

    registerRecipeRoutes(app, { listRecipes });

    const port = Number(process.env.PORT || 3001);
    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`recipe-service escuchando en :${port}`);
}

main();

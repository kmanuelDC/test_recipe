import type { FastifyInstance } from "fastify";
import { ListRecipes } from "../../application/usecase/ListRecipes.js";



export function registerRecipeRoutes(
    app: FastifyInstance,
    deps: { listRecipes: ListRecipes }
) {
    app.get("/recipes", async (_req, reply) => {
        const data = await deps.listRecipes.execute();
        reply.send({ data });
    });
}

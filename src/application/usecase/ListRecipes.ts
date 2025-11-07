import { RecipeRepository } from "../../domain/repositories/RecipeRepository.js";
import { RecipeDTO } from "../dto/RecipeDTO.js";


export class ListRecipes {
    constructor(private readonly repo: RecipeRepository) { }

    async execute(): Promise<RecipeDTO[]> {
        const recipes = await this.repo.findAll();
        return recipes.map((r) => ({
            id: r.id,
            name: r.name,
            items: r.items.map((i) => ({
                ingredient: i.ingredient,
                qtyRequired: i.qtyRequired
            }))
        }));
    }
}

export interface IngredientModel {
    id?: number;
    name: string;
    slug: string;
    description: string;
    foodGroup: string;
    createdAt?: string;
    updatedAt?: string;
    image?: string;
}

export interface RecetaSimpleModel {
    id: number;
    name: string;
    slug: string;
    imagen?: string;
    createdAt: string;
}
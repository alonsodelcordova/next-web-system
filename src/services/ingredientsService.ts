import { URL_API } from "@/util/constantes";
import { getApi, postApi } from "./mainService";
import { IngredientModel, RecetaSimpleModel } from "@/models/ingredientsModel";


export const GetAllIngredients = async () : Promise<IngredientModel[]> => {
    return await getApi(`${URL_API}/ingredients/`)
}

export const CreateIngredient = async (data: IngredientModel) : Promise<IngredientModel> => {
    return await postApi(`${URL_API}/ingredients/`, data)
}

export const GetRecetasALL = async () : Promise<RecetaSimpleModel[]> => {
    return await getApi(`${URL_API}/recetas/`)
}


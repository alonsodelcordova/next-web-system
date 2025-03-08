import { LoginModel, LoginResponseModel } from "@/models/authModel";
import { URL_API } from "@/util/constantes";
import axios from "axios";
import {  getApi,  saveSesion } from "./mainService";

export const LoginService = async (userInput:LoginModel)=> {

    return await axios.post(`${URL_API}/user/login`, userInput)
    .then((response) => {
        saveSesion(response.data);
        return response.data;
    }).catch((error) => {
        throw error;
    });
}

export const GetAllUsuarios = async ()=> {
    return await getApi(`${URL_API}/user`)
}





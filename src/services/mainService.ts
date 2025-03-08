import { LoginResponseModel } from "@/models/authModel";
import { URL_API } from "@/util/constantes";
import axios from "axios";


export const getApi = async (url: string) => {
  return await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then((response) =>  response.data )
  .catch((error) => {
    if (error.response.status == 401) {
        DeleteSession();
        console.log('Error 401');
    }
    throw error;
});

}

export const postApi = async (url: string, data: any) => {
  return await axios.post(url, data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then((response) =>  response.data )
  .catch((error) => {
    if (error.response.status == 401) {
        DeleteSession();
        console.log('Error 401');
    }
    throw error;
});
}

export const saveSesion = (response:LoginResponseModel) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response));
}

export const GetSesionToken = () => {
    return localStorage.getItem('token');
}

export const GetUser = () => {
    return JSON.parse(localStorage.getItem('user') || '{}') as LoginResponseModel;
}

export const DeleteSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export enum ModelEnum {
  RECETA = 'receta',
  INGREDIENTE = 'ingredient',
  USUARIO = 'user',
}


export const UpdateImageService = async (id: any, file: any, model:ModelEnum) => {
  const data = new FormData();
  data.append('image', file);
  data.append('id', id);
  data.append('model', model.valueOf());
  return await axios.post(`${URL_API}/upload_imagen`, data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then((response) =>  response.data )
  .catch((error) => {
    if (error.response.status == 401) {
        DeleteSession();
        console.log('Error 401');
    }
    throw error;
  });
}


export interface LoginModel{
    username: string;
    password: string;
}

export interface LoginResponseModel{
    username: string;
    photo: string;
    token: string;
}

export interface UserModel extends LoginResponseModel{
    id: number;
    createdAt: string;
    updatedAt: string;
}
import { ObjectId } from 'mongodb';

export interface Patient{
    _id?: ObjectId;
    name: string;
    last_name: string;
    email: string;
    password: string;
    createdAt?: string;
    updateAt?: string;
    __v?: number
}

export interface UpdatePatient{
    _id?: string;
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    updateAt?: string;
    __v?: number
}
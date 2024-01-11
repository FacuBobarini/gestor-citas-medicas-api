import { ObjectId } from 'mongodb';

export interface Doctor{
    _id?: ObjectId;
    name: string;
    last_name: string;
    email: string;
    password: string;
    specialization: string;
    createdAt?: string;
    updateAt?: string;
    __v?: number
}

export interface NewDoctor{
    _id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    specialization: string;
    createdAt?: string;
    updateAt?: string;
    __v?: number
}
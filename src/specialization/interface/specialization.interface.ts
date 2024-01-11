import { ObjectId } from 'mongodb';

export interface Specialization{
    _id?: ObjectId;
    name?: string;
    description?: string;
    createdAt?: string;
    updateAt?: string;
    __v?: number
}
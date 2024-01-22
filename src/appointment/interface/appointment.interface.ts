import { ObjectId } from 'mongodb';

export enum appointmentStatus {
    PENDING = 'PENDING',
    DONE = 'DONE'
}

export interface Appointment{
    _id?: ObjectId;
    date?: string;
    time?: string;
    status?:string;
    specialization?: string;
    doctor?: string;
    patient?: string;
    createdAt?: string;
    updateAt?: string;
    __v?: number
}
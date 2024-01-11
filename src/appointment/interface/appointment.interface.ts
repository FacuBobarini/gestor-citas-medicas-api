import { ObjectId } from 'mongodb';

export enum appointmentStatus {
    PENDING = 'PENDING',
    DONE = 'DONE'
}

export enum appointmentTime {
    H0800 = '08:00',
    H0830 = '08:30',
    H0900 = '09:30',
    H0930 = '09:30',
    H1000 = '10:00',
    H1030 = '10:30',
    H1100 = '11:00',
    H1130 = '11:30',
    H1200 = '12:00',
    H1230 = '12:30',
    H1300 = '13:00',
    H1330 = '13:30',
    H1400 = '14:00',
    H1430 = '14:30',
    H1500 = '15:00',
    H1530 = '15:30',
    H1600 = '16:00',
    H1630 = '16:30',

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
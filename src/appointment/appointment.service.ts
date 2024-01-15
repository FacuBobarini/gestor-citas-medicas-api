import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Appointments } from 'src/schema/appointment.schema';
import { Appointment } from './interface/appointment.interface';

@Injectable()
export class AppointmentService {
    constructor (@InjectModel(Appointments.name) private appointmentModel: Model<Appointments>){}

    findAllAppointments(spec: string){
        let query: { [key: string]: any } = {date: { $gte: new Date() }}

        spec&& (query.specialization = new Types.ObjectId(spec))

        return  this.appointmentModel.find( query )
        .populate('specialization','name')
        .populate('doctor','name last_name')
        .populate('patient','name last_name').exec()
    }

    findAppointmentById(id: string){
        return  this.appointmentModel.findById(id)
        .populate('specialization','name')
        .populate('doctor','name last_name')
        .populate('patient','name last_name').exec()
    }

    addNewAppointment(appointment: Appointment){
        return new this.appointmentModel(appointment).save()
    }

    removeAppointment(id: string){
        return this.appointmentModel.findByIdAndDelete(id)
    }

    findAndUpdateAppointment(id: string , appointment: Appointment){
        return this.appointmentModel.findByIdAndUpdate(id, appointment)
    }
}

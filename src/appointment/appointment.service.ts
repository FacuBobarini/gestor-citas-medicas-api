import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Appointments } from 'src/schema/appointment.schema';
import { Appointment } from './interface/appointment.interface';
import * as moment from 'moment';

@Injectable()
export class AppointmentService {
    constructor (@InjectModel(Appointments.name) private appointmentModel: Model<Appointments>){}

    findAllAppointments(spec: string, doctor: string, getAll: string, patient: string){
        let query= {date: { $gte: moment().format('YYYY-MM-DD') }}
        
        if(spec){ query["specialization"] = new Types.ObjectId(spec)}

        if(doctor){ query["doctor"] = new Types.ObjectId(doctor)}

        if(patient){ query["patient"] = new Types.ObjectId(patient)}

        if(getAll === "true"){ delete query.date}
        
        return  this.appointmentModel.find(query)
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

    addNewAppointment(appointment: any){
        return new this.appointmentModel(appointment).save()
    }

    removeAppointment(id: string){
        return this.appointmentModel.findByIdAndDelete(id)
    }

    findAndUpdateAppointment(id: string , appointment: Appointment){
        return this.appointmentModel.findByIdAndUpdate(id, appointment)
    }
}

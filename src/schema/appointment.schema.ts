import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { Specializations } from "./specialization.schema";
import { Doctors } from "./doctor.schema";
import { Patients } from "./patient.schema";
import { HttpException, HttpStatus } from "@nestjs/common";

@Schema({
    timestamps: true
})
export class Appointments {

    @Prop({
        required: true,
        trim: true,
        type: MongooseSchema.Types.Date
    })
    date: string;

    @Prop({
        required: true,
        trim: true
    })
    time: string;

    @Prop({
        default: 'PENDING'
    })
    status: string;

    @Prop({
        required: true,
        trim: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Specializations',        
    })
    specialization: Specializations
    
    @Prop({
        required: true,
        trim: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Doctors',        
    })
    doctor: Doctors
    
    @Prop({
        required: true,
        trim: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Patients',     
    })
    patient: Patients  

}

const AppointmentsSchema =  SchemaFactory.createForClass(Appointments)

AppointmentsSchema.pre("save",async function(next){

    const existingAppointment = await this.model(Appointments.name).findOne({
        date: new Date(this.date),
        time: this.time,
        doctor: this.doctor,
    })

    if (existingAppointment) {
        const err = new HttpException('Appointment already exists', HttpStatus.CONFLICT);
        return next(err);}


    if(await this.model(Specializations.name).findById(this.specialization) 
    && await this.model(Doctors.name).findById(this.doctor) 
    && await this.model(Patients.name).findById(this.patient)){ 
    next()}

    const err:HttpException = new HttpException('One or more properties are incorrect: Specialization, Doctor, Patient', HttpStatus.NOT_FOUND)

    next(err)
    
 });

 export {AppointmentsSchema}
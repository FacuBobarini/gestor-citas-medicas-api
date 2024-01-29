import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Doctors } from "./doctor.schema";
import { Appointments } from "./appointment.schema";
import * as moment from 'moment';
import 'moment-timezone'


@Schema({
    timestamps: true
})
export class Days_Off {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Doctors',        
    })
    doctor: Doctors

    @Prop({
        type: [MongooseSchema.Types.Date],
    })
    daysOff: string;

    @Prop([{ date: { type: MongooseSchema.Types.Date,}, 
        timeSlots: { type: [String] } 
    }])
    appointmentsOff: { date: Date; timeSlots: string[] }[];

    @Prop({ 
        type: String,
    })
    reason: string;

    @Prop({ 
        type: String,
    })
    observation: string;
};

const DaysOffSchema:MongooseSchema =  SchemaFactory.createForClass(Days_Off)

DaysOffSchema.pre("save",async function(next){

    const doctorInfo:any = await this.model(Doctors.name).findById(this.doctor)
    if(!doctorInfo){ 
        const err:HttpException = new HttpException('Doctor Not Found', HttpStatus.NOT_FOUND)
        next(err)
    }
    
    if(this.appointmentsOff[0]){
        const appointmentSchedule:any = this.appointmentsOff.map((appointments:any)=>{
            return appointments.timeSlots
        })
        if ((appointmentSchedule.flat(Infinity)).some(hour => !new Set(doctorInfo.workSchedule).has(hour))){
            const err:HttpException = new HttpException(`Take only this appointments:|`+doctorInfo.workSchedule, HttpStatus.BAD_REQUEST)
            return next(err)
        }

        const dates:any = this.appointmentsOff.map((appointments:any)=>{
            return appointments.timeSlots.map((time:string)=>{
                const appointmentOffDate = moment(appointments.date, 'YYYY-MM-DD').toISOString()
                return moment.utc(`${appointmentOffDate} ${time}`,'YYYY-MM-DD HH:mm').toString()
            })
        })
        
        const existingAppointment = await this.model(Appointments.name).find({dateTime:{ $in: dates.flat(Infinity) },doctor: doctorInfo._id})
        if(existingAppointment[0]){
            const err:HttpException = new HttpException((`Appointment already exists:|`+existingAppointment), HttpStatus.CONFLICT)
            next(err)
        }
    }

    if(this.daysOff[0]){
        const dates = this.daysOff.map((day:string)=>{
            return moment(day, 'YYYY-MM-DD').toISOString()
        })

        const existingDates = await this.model(Appointments.name).find( {date:{ $in:dates }})
        if(existingDates[0]){
            const err:HttpException = new HttpException(`Appointment already exists:|`+existingDates, HttpStatus.CONFLICT)
            next(err)
        }
    }
    
    next()
});

export { DaysOffSchema }

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, ObjectId, Types, UpdateQuery } from "mongoose";
import { Specializations } from "./specialization.schema";
import { HttpException, HttpStatus } from "@nestjs/common";
import { format, addMinutes  } from "date-fns";


@Schema({
    timestamps: true
})
export class Doctors {
    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    last_name: string;

    @Prop({
        unique: true,
        required: true,
    })
    dni: string;

    @Prop({
        unique: true,
        required: true,
    })
    email: string;

    @Prop({
        required: true,
      })
    startTime: string;
    
    @Prop({
        required: true,
    })
    endTime: string;

    @Prop({
        type: [String], 
        default: [] 
    })
    workSchedule: string;

    @Prop({
        required: true,
    })
    password: string; 

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Specializations',        
    })
    specialization: Specializations
};

 const DoctorSchema:MongooseSchema =  SchemaFactory.createForClass(Doctors)

 DoctorSchema.pre("save",async function(next){

    const specializationInfo:any = await this.model(Specializations.name).findById(this.specialization)
    if(specializationInfo){ 
    
        const doctorSchedule = () => {

            const schedule: string[] = [];

            let actualAppointment = new Date(`2000-01-01T${this.startTime}:00`);
            while (actualAppointment < new Date(`2000-01-01T${this.endTime}:00`)) {
                schedule.push(format(actualAppointment, 'HH:mm'));
                actualAppointment = addMinutes(actualAppointment, specializationInfo.appointmentTime);
             }

             return schedule;
          }
          
        this.workSchedule = doctorSchedule()

        next()
    }

    const err:HttpException = new HttpException('Specialization Not Found', HttpStatus.NOT_FOUND)

    next(err)
    
 });

 DoctorSchema.pre("findOneAndUpdate",async function(next){

    const update: UpdateQuery<ObjectId> = this.getUpdate()
    if(!update.specialization){
        next()
    }
    
    const idUpdate: Types.ObjectId = new Types.ObjectId(update.specialization)  
    if(await this.model.db.collection('specializations').findOne({ _id:  idUpdate })){
        next()
    }

    const err:HttpException = new HttpException('Specialization Not Found', HttpStatus.NOT_FOUND)

    next(err)
    
 });

 export { DoctorSchema }

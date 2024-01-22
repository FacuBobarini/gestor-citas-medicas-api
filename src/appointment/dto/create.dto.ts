import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Appointment } from "../interface/appointment.interface";

export class CreateAppointmentDTO implements Appointment{
    @IsString()
    @IsNotEmpty()
    date: string;
    @IsString()
    @IsNotEmpty()
    time: string;
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    specialization: string;
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    doctor: string;
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    patient: string; 
}

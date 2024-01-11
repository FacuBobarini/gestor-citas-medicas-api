import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Appointment, appointmentStatus, appointmentTime } from "../interface/appointment.interface";

export class CreateAppointmentDTO implements Appointment{
    @IsString()
    @IsNotEmpty()
    date: string;
    @IsString()
    @IsNotEmpty()
    @IsEnum(appointmentTime)
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

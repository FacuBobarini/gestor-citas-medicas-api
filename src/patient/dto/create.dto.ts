import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Patient } from "../interface/patient.interface";

export class CreatePatientDTO implements Patient{
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    last_name: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/, {
    message: 'La contraseña debe contener al menos 1 mayúscula, números y letras, y tener entre 8 y 16 caracteres.',
  })
    password: string;
   
}

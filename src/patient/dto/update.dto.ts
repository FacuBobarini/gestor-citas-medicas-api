import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class updatePatientDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    last_name?: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/, {
    message: 'La contraseña debe contener al menos 1 mayúscula, números y letras, y tener entre 8 y 16 caracteres.',
  })
    password?: string;
    
}
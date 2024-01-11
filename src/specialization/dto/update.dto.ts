import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class updateSpecializationDTO{
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

}
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Specialization } from "src/specialization/interface/specialization.interface";


export class CreateSpecializationDTO implements Specialization{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

}
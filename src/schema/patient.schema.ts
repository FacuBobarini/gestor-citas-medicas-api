import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Patients {
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
    password: string;

}

export const PatientsSchema =  SchemaFactory.createForClass(Patients)
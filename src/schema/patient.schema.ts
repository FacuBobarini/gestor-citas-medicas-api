import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Patients {
    @Prop({
        required: true,
        trim: true
    })
    name: string;

    @Prop({
        required: true,
        trim: true
    })
    last_name: string;

    @Prop({
        unique: true,
        required: true,
        trim: true
    })
    email: string;

    @Prop({
        required: true,
        trim: true
    })
    password: string;

}

export const PatientsSchema =  SchemaFactory.createForClass(Patients)
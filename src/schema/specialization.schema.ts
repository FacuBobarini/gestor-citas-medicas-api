import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Specializations{
    @Prop({
        unique: true,
        required: true,
        trim: true,
        toUpperCase: true
    })
    name: string;

    @Prop({
        required: true,
        trim: true
    })
    description: string;
}

export const SpecializationSchema =  SchemaFactory.createForClass(Specializations)
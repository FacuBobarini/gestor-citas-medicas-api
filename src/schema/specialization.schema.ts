import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Specializations{
    @Prop({
        unique: true,
        required: true,
        toUpperCase: true
    })
    name: string;

    @Prop({
        required: true,
    })
    description: string;

    @Prop({
        required: true,
        type: Number, 
        min: 0,
        validate: {
          validator: Number.isInteger, 
          message: 'appointmentTime isnt integer',
        },
    })
    appointmentTime: number;
    
}

export const SpecializationSchema =  SchemaFactory.createForClass(Specializations)
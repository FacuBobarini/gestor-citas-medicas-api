import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, ObjectId, Types, UpdateQuery } from "mongoose";
import { Specializations } from "./specialization.schema";
import { HttpException, HttpStatus } from "@nestjs/common";


@Schema({
    timestamps: true
})
export class Doctors {
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

    

    @Prop({
        required: true,
        trim: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Specializations',        
    })
    specialization: Specializations  

  
};

 const DoctorSchema:MongooseSchema =  SchemaFactory.createForClass(Doctors)

 DoctorSchema.pre("save",async function(next){
    if(await this.model(Specializations.name).findById(this.specialization)){ 
    next()}

    const err:HttpException = new HttpException('Specialization Not Found', HttpStatus.NOT_FOUND)

    next(err)
    
 });

 DoctorSchema.pre("findOneAndUpdate",async function(next){
    const update: UpdateQuery<ObjectId> = this.getUpdate()
    
    if(!update.specialization){next()}
    
    const idUpdate: Types.ObjectId = new Types.ObjectId(update.specialization)
    
    if(await this.model.db.collection('specializations').findOne({ _id:  idUpdate })){
        next()
    }

    const err:HttpException = new HttpException('Specialization Not Found', HttpStatus.NOT_FOUND)

    next(err)
    
 });

 export { DoctorSchema }

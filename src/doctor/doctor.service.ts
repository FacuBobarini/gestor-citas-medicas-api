import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from 'src/doctor/interface/doctor.interface';
import { Doctors } from 'src/schema/doctor.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
    constructor (@InjectModel(Doctors.name) private doctorModel: Model<Doctors>){}

    findAllDoctors(){
        return  this.doctorModel.find()
        .populate('specialization','-_id name description')
        .select('-_id -createdAt -updatedAt -__v' ).exec()
    }

    findDoctorById(id: string){
        return  this.doctorModel.findById(id)
        .populate('specialization','-_id name description')
        .select('-_id -createdAt -updatedAt -__v' ).exec()
    }

    addNewDoctor(doctor: any){

        const {password}= doctor

        const hash:string = bcrypt.hashSync(password, (bcrypt.genSaltSync(10)));

        doctor.password = hash
        
        return new this.doctorModel(doctor).save()
    }

    removeDoctor(id: string){
        return this.doctorModel.findByIdAndDelete(id)
    }

    findAndUpdateDoctor(id: string , doctor: Doctor){
        return this.doctorModel.findByIdAndUpdate(id, doctor)
    }
}

import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from 'src/doctor/interface/doctor.interface';
import { Doctors } from 'src/schema/doctor.schema';

@Injectable()
export class DoctorService {
    constructor (@InjectModel(Doctors.name) private doctorModel: Model<Doctors>){}

    findAllDoctors(){
        return  this.doctorModel.find().populate('specialization','name description').exec()
    }

    findDoctorById(id: string){
        return  this.doctorModel.findById(id).populate('specialization','name description').exec()
    }

    addNewDoctor(doctor: any){
        const newDoctor= doctor

        return new this.doctorModel(doctor).save()
    }

    removeDoctor(id: string){
        return this.doctorModel.findByIdAndDelete(id)
    }

    findAndUpdateDoctor(id: string , doctor: Doctor){
        return this.doctorModel.findByIdAndUpdate(id, doctor)
    }
}

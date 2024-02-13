import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patients } from 'src/schema/patient.schema';
import { Patient, UpdatePatient } from './interface/patient.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientService {
    constructor (@InjectModel(Patients.name) private patientModel: Model<Patients>){}

    findAllPatients(){
        return  this.patientModel.find()
        .select('-_id -createdAt -updatedAt -__v' ).exec()
    }

    findPatientById(id: string){
        return  this.patientModel.findById(id)
        .select('-_id -createdAt -updatedAt -__v' ).exec()
    }

    addNewPatient(patient: Patient){
        const {password}= patient

        const hash:string = bcrypt.hashSync(password, (bcrypt.genSaltSync(10)));

        patient.password = hash
        return new this.patientModel(patient).save()
    }

    removePatient(id: string){
        return this.patientModel.findByIdAndDelete(id)
    }

    findAndUpdatePatient(id: string , patient: UpdatePatient){
        return this.patientModel.findByIdAndUpdate(id, patient)
    }
}

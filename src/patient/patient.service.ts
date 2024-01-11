import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patients } from 'src/schema/patient.schema';
import { Patient, UpdatePatient } from './interface/patient.interface';

@Injectable()
export class PatientService {
    constructor (@InjectModel(Patients.name) private patientModel: Model<Patients>){}

    findAllPatients(){
        return  this.patientModel.find()
    }

    findPatientById(id: string){
        return  this.patientModel.findById(id)
    }

    addNewPatient(patient: Patient){
        return new this.patientModel(patient).save()
    }

    removePatient(id: string){
        return this.patientModel.findByIdAndDelete(id)
    }

    findAndUpdatePatient(id: string , patient: UpdatePatient){
        return this.patientModel.findByIdAndUpdate(id, patient)
    }
}

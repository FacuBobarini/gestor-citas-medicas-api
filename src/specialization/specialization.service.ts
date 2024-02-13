import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialization } from 'src/specialization/interface/specialization.interface';
import { Specializations } from 'src/schema/specialization.schema';

@Injectable()
export class SpecializationService {
    constructor (@InjectModel(Specializations.name) private specializationModel: Model<Specializations>){}

    findAllSpecialization(){
    return this.specializationModel.find()
    .select('-_id -createdAt -updatedAt -__v' ).exec()
    }

    findSpecializationById(id:string){
        return this.specializationModel.findById(id)
        .select('-_id -createdAt -updatedAt -__v' ).exec()
    }

    addNewSpecialization(specialization: any){
        return new this.specializationModel(specialization).save()
    }

    removeSpecialization(id: string){
        return this.specializationModel.findByIdAndDelete(id)
    }

    findAndUpdateSpecialization(id: string , specialization: Specialization){
        return this.specializationModel.findByIdAndUpdate(id, specialization)
    }
}

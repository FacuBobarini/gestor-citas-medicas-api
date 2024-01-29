import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Days_Off } from 'src/schema/daysoff.schema';

@Injectable()
export class DaysoffService {
    constructor (@InjectModel(Days_Off.name) private dayOffmentModel: Model<Days_Off>){}

    findAllDaysOff(doctor: string){
         let query= {date: { $gte: (new Date()).toISOString().split('T')[0] }}
        
        if(doctor){ query["doctor"] = new Types.ObjectId(doctor)}

        return  this.dayOffmentModel.find()
        .populate('doctor','name last_name').exec()
    }

    findDayOffById(id: string){
        return  this.dayOffmentModel.findById(id)
        .populate('doctor','name last_name').exec()
    }

    addNewDaysOff(daysOff: any){
        return new this.dayOffmentModel(daysOff).save()
    }

    removeDayOff(id: string){
        return this.dayOffmentModel.findByIdAndDelete(id)
    }
}

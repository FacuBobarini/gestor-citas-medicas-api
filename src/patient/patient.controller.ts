import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ErrorExceptionFilter, MongoExceptionFilter, MongooseExceptionFilter } from 'src/exception-filter/mongoose.exception-filter';
import { Document, ModifyResult } from 'mongoose';
import { PatientService } from './patient.service';
import { updatePatientDTO } from './dto/update.dto';
import { CreatePatientDTO } from './dto/create.dto';

@Controller('patient')
export class PatientController {
    constructor (private patientService: PatientService){}

    @Get()
    async getAllDosctors(){
       return await this.patientService.findAllPatients()
    }

    @Get(':id')
    @UseFilters(MongooseExceptionFilter)
    async getPatientById(@Param('id') id: string){
        const patient: Document = await this.patientService.findPatientById(id)
        if(patient) return patient
        else throw new HttpException('Patient Not Found', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UseFilters(ErrorExceptionFilter, MongoExceptionFilter)
    createPatient(@Body()body:CreatePatientDTO){
        return this.patientService.addNewPatient(body)
    }

    @Delete(':id')
    @UseFilters(MongooseExceptionFilter)
    async deletePatient(@Param('id') id: string){
        const patient= await this.patientService.removePatient(id)
        if(patient) return patient
        else throw new HttpException('Patient Not Found', HttpStatus.NOT_FOUND)
    }

    @Patch(':id')
    @UseFilters(MongooseExceptionFilter, MongoExceptionFilter)
    async updatePatient(@Param('id') id: string,@Body()body: updatePatientDTO){
        const patient: Document = await this.patientService.findAndUpdatePatient(id,body)
        if(patient) return patient
        else throw new HttpException('Patient Not Found', HttpStatus.NOT_FOUND)
    }
}

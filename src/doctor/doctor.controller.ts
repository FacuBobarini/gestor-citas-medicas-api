import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDTO } from 'src/doctor/dto/create.dto';
import { ErrorExceptionFilter, MongoExceptionFilter, MongooseExceptionFilter } from 'src/exception-filter/mongoose.exception-filter';
import { Document, ModifyResult } from 'mongoose';
import { updateDoctorDTO } from './dto/update.dto';

@Controller('doctor')
export class DoctorController {
    constructor (private doctorService: DoctorService){}

    @Get()
    async getAllDosctors(){
       return await this.doctorService.findAllDoctors()
    }

    @Get(':id')
    @UseFilters(MongooseExceptionFilter)
    async getDoctorById(@Param('id') id: string){
        const doctor: Document = await this.doctorService.findDoctorById(id)
        if(doctor) return doctor
        else throw new HttpException('Doctor Not Found', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UseFilters(ErrorExceptionFilter, MongoExceptionFilter)
    createDoctor(@Body()body:CreateDoctorDTO){
        return this.doctorService.addNewDoctor(body)
    }

    @Delete(':id')
    @UseFilters(MongooseExceptionFilter)
    async deleteDoctor(@Param('id') id: string){
        const doctor= await this.doctorService.removeDoctor(id)
        if(doctor) return doctor
        else throw new HttpException('Doctor Not Found', HttpStatus.NOT_FOUND)
    }

    @Patch(':id')
    @UseFilters(MongooseExceptionFilter, MongoExceptionFilter)
    async updateDoctor(@Param('id') id: string,@Body()body: updateDoctorDTO){
        const doctor: Document = await this.doctorService.findAndUpdateDoctor(id,body)
        if(doctor) return doctor
        else throw new HttpException('Doctor Not Found', HttpStatus.NOT_FOUND)
    }
}

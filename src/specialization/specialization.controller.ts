import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDTO } from 'src/specialization/dto/create.dto';
import { MongoExceptionFilter, MongooseExceptionFilter } from 'src/exception-filter/mongoose.exception-filter';
import { updateSpecializationDTO } from './dto/update.dto';
import { Document, ModifyResult } from 'mongoose';

@Controller('specialization')
export class SpecializationController {
    constructor (private specializationService: SpecializationService){}

    @Get()
    async getAllSpecializations(){
       return await this.specializationService.findAllSpecialization()
    }

    @Get(':id')
    @UseFilters(MongooseExceptionFilter)
    async getSpecializationById(@Param('id') id: string){
        const specialization = await this.specializationService.findSpecializationById(id)
        if(specialization) return specialization
        else throw new HttpException('Specialization not found!', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UseFilters(MongoExceptionFilter)
    async createSpecialization(@Body()body:CreateSpecializationDTO){
        return await this.specializationService.addNewSpecialization(body)
    }

    @Delete(':id')
    @UseFilters(MongooseExceptionFilter)
    async deleteSpecialization(@Param('id') id: string){
        const specialization= await this.specializationService.removeSpecialization(id)
        if(specialization) return specialization
        else throw new HttpException('Specialization Not Found', HttpStatus.NOT_FOUND)
    }

    @Patch(':id')
    @UseFilters(MongooseExceptionFilter, MongoExceptionFilter)
    async updateSpecialization(@Param('id') id: string,@Body()body: updateSpecializationDTO){
        const specialization: Document = await this.specializationService.findAndUpdateSpecialization(id,body)
        if(specialization) return specialization
        else throw new HttpException('Specialization Not Found', HttpStatus.NOT_FOUND)
    }
}

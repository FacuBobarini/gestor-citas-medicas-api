import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ErrorExceptionFilter, MongoExceptionFilter, MongooseExceptionFilter } from 'src/exception-filter/mongoose.exception-filter';
import { ModifyResult, Document } from 'mongoose';
import { CreateAppointmentDTO } from './dto/create.dto';

@Controller('appointment')
export class AppointmentController {
    
    constructor (private appointmentService: AppointmentService){}

    @Get()
    async getAllAppointments(){
       return await this.appointmentService.findAllAppointments()
    }

    @Get('id/:id')
    @UseFilters(MongooseExceptionFilter)
    async getAppointmentrById(@Param('id') id: string){
        const doctor: Document = await this.appointmentService.findAppointmentById(id)
        if(doctor) return doctor
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }

    @Get('query/')
    @UseFilters(MongooseExceptionFilter, MongoExceptionFilter, ErrorExceptionFilter)
    async getAppointmentrBySpecialization(@Query('spec')spec: string){
       const appointment = await this.appointmentService.findAppointmentBySpecialization(spec)
        if(appointment) return appointment
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UseFilters(ErrorExceptionFilter, MongoExceptionFilter)
    createAppointment(@Body()body:CreateAppointmentDTO){
        return this.appointmentService.addNewAppointment(body)
    }

    @Delete(':id')
    @UseFilters(MongooseExceptionFilter)
    async deleteAppointment(@Param('id') id: string){
        const doctor = await this.appointmentService.removeAppointment(id)
        if(doctor) return doctor
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }

    @Patch(':id')
    @UseFilters(MongooseExceptionFilter, MongoExceptionFilter)
    async updateAppointment(@Param('id') id: string,@Body()body: any){
        const doctor: Document = await this.appointmentService.findAndUpdateAppointment(id,body)
        if(doctor) return doctor
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }
}

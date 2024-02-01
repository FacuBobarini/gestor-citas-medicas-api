import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ErrorExceptionFilter, MongoExceptionFilter, MongooseExceptionFilter } from 'src/exception-filter/mongoose.exception-filter';
import { Document } from 'mongoose';
import { CreateAppointmentDTO } from './dto/create.dto';

@Controller('appointment')
export class AppointmentController {
    
    constructor (private appointmentService: AppointmentService){}

    @Get()
    async getAllAppointments(
        @Query('spec')spec: string,
        @Query('doctor') doctor: string,
        @Query('getall') getAll: string, 
        @Query('patient') patient: string){
       return await this.appointmentService.findAllAppointments(spec ,doctor,getAll,patient)
    }

    @Get(':id')
    @UseFilters(MongooseExceptionFilter)
    async getAppointmentrById(@Param('id') id: string){
        const appointment: Document = await this.appointmentService.findAppointmentById(id)
        if(appointment) return appointment
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UseFilters(ErrorExceptionFilter, MongoExceptionFilter)
    createAppointment(@Body()body:any){
        return this.appointmentService.addNewAppointment(body)
    }

    @Delete(':id')
    @UseFilters(MongooseExceptionFilter)
    async deleteAppointment(@Param('id') id: string){
        const appointment = await this.appointmentService.removeAppointment(id)
        if(appointment) return appointment
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }

    @Patch(':id')
    @UseFilters(MongooseExceptionFilter, MongoExceptionFilter)
    async updateAppointment(@Param('id') id: string,@Body()body: any){
        const appointment: Document = await this.appointmentService.findAndUpdateAppointment(id,body)
        if(appointment) return appointment
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }
}

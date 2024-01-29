import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, UseFilters } from '@nestjs/common';
import { DaysoffService } from './daysoff.service';
import { ErrorExceptionFilter, MongoExceptionFilter, MongooseExceptionFilter } from 'src/exception-filter/mongoose.exception-filter';

@Controller('daysoff')
export class DaysoffController {
    constructor (private daysOffService: DaysoffService){}

    @Get()
    async getAllAppointments(@Query('doctor')doctor: string){
       return await this.daysOffService.findAllDaysOff(doctor)
    }

    @Get(':id')
    @UseFilters(MongooseExceptionFilter)
    async getAppointmentrById(@Param('id') id: string){
        const dayOff: any = await this.daysOffService.findDayOffById(id)
        if(dayOff) return dayOff
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UseFilters(ErrorExceptionFilter, MongoExceptionFilter)
    createAppointment(@Body()body:any){
        return this.daysOffService.addNewDaysOff(body)
    }

    @Delete(':id')
    @UseFilters(MongooseExceptionFilter)
    async deleteAppointment(@Param('id') id: string){
        const doctor = await this.daysOffService.removeDayOff(id)
        if(doctor) return doctor
        else throw new HttpException('Appointment Not Found', HttpStatus.NOT_FOUND)
    }
}

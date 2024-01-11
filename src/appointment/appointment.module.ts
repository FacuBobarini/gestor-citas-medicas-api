import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointments, AppointmentsSchema } from 'src/schema/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointments.name, schema: AppointmentsSchema }]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}

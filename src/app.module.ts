import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SpecializationModule } from './specialization/specialization.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { DaysoffModule } from './daysoff/daysoff.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal : true
  }),
  MongooseModule.forRoot(process.env.DB_ACCES),
  DoctorModule,
  SpecializationModule,
  PatientModule,
  AppointmentModule,
  DaysoffModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

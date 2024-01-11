import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Patients, PatientsSchema } from 'src/schema/patient.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patients.name, schema: 
    PatientsSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}

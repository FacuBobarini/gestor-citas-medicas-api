import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema, Doctors } from 'src/schema/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctors.name, schema: DoctorSchema }]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule {}

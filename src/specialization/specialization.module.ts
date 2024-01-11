import { Module } from '@nestjs/common';
import { SpecializationController } from './specialization.controller';
import { SpecializationService } from './specialization.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SpecializationSchema, Specializations } from 'src/schema/specialization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Specializations.name, schema: SpecializationSchema }]),
  ],
  controllers: [SpecializationController],
  providers: [SpecializationService]
})
export class SpecializationModule {}

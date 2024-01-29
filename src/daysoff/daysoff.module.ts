import { Module } from '@nestjs/common';
import { DaysoffController } from './daysoff.controller';
import { DaysoffService } from './daysoff.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DaysOffSchema, Days_Off } from 'src/schema/daysoff.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Days_Off.name, schema: DaysOffSchema }]),
  ],
  controllers: [DaysoffController],
  providers: [DaysoffService]
})
export class DaysoffModule {}

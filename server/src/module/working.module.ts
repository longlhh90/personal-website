import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingController } from '../web/rest/working.controller';
import { WorkingRepository } from '../repository/working.repository';
import { WorkingService } from '../service/working.service';

@Module({
    imports: [TypeOrmModule.forFeature([WorkingRepository])],
    controllers: [WorkingController],
    providers: [WorkingService],
    exports: [WorkingService],
})
export class WorkingModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationController } from '../web/rest/education.controller';
import { EducationRepository } from '../repository/education.repository';
import { EducationService } from '../service/education.service';

@Module({
    imports: [TypeOrmModule.forFeature([EducationRepository])],
    controllers: [EducationController],
    providers: [EducationService],
    exports: [EducationService],
})
export class EducationModule {}

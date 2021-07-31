import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceController } from '../web/rest/experience.controller';
import { ExperienceRepository } from '../repository/experience.repository';
import { ExperienceService } from '../service/experience.service';

@Module({
    imports: [TypeOrmModule.forFeature([ExperienceRepository])],
    controllers: [ExperienceController],
    providers: [ExperienceService],
    exports: [ExperienceService],
})
export class ExperienceModule {}

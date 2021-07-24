import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from '../web/rest/project.controller';
import { ProjectRepository } from '../repository/project.repository';
import { ProjectService } from '../service/project.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectRepository])],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService],
})
export class ProjectModule {}

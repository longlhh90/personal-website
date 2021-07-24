import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProjectDTO } from '../service/dto/project.dto';
import { ProjectMapper } from '../service/mapper/project.mapper';
import { ProjectRepository } from '../repository/project.repository';

const relationshipNames = [];

@Injectable()
export class ProjectService {
    logger = new Logger('ProjectService');

    constructor(@InjectRepository(ProjectRepository) private projectRepository: ProjectRepository) {}

    async findById(id: string): Promise<ProjectDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.projectRepository.findOne(id, options);
        return ProjectMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<ProjectDTO>): Promise<ProjectDTO | undefined> {
        const result = await this.projectRepository.findOne(options);
        return ProjectMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProjectDTO>): Promise<[ProjectDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.projectRepository.findAndCount(options);
        const projectDTO: ProjectDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((project) => projectDTO.push(ProjectMapper.fromEntityToDTO(project)));
            resultList[0] = projectDTO;
        }
        return resultList;
    }

    async save(projectDTO: ProjectDTO): Promise<ProjectDTO | undefined> {
        const entity = ProjectMapper.fromDTOtoEntity(projectDTO);
        const result = await this.projectRepository.save(entity);
        return ProjectMapper.fromEntityToDTO(result);
    }

    async update(projectDTO: ProjectDTO): Promise<ProjectDTO | undefined> {
        const entity = ProjectMapper.fromDTOtoEntity(projectDTO);
        const result = await this.projectRepository.save(entity);
        return ProjectMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.projectRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

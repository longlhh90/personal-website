import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ExperienceDTO } from '../service/dto/experience.dto';
import { ExperienceMapper } from '../service/mapper/experience.mapper';
import { ExperienceRepository } from '../repository/experience.repository';

const relationshipNames = [];

@Injectable()
export class ExperienceService {
    logger = new Logger('ExperienceService');

    constructor(@InjectRepository(ExperienceRepository) private experienceRepository: ExperienceRepository) {}

    async findById(id: string): Promise<ExperienceDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.experienceRepository.findOne(id, options);
        return ExperienceMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<ExperienceDTO>): Promise<ExperienceDTO | undefined> {
        const result = await this.experienceRepository.findOne(options);
        return ExperienceMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ExperienceDTO>): Promise<[ExperienceDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.experienceRepository.findAndCount(options);
        const experienceDTO: ExperienceDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((experience) => experienceDTO.push(ExperienceMapper.fromEntityToDTO(experience)));
            resultList[0] = experienceDTO;
        }
        return resultList;
    }

    async save(experienceDTO: ExperienceDTO): Promise<ExperienceDTO | undefined> {
        const entity = ExperienceMapper.fromDTOtoEntity(experienceDTO);
        const result = await this.experienceRepository.save(entity);
        return ExperienceMapper.fromEntityToDTO(result);
    }

    async update(experienceDTO: ExperienceDTO): Promise<ExperienceDTO | undefined> {
        const entity = ExperienceMapper.fromDTOtoEntity(experienceDTO);
        await this.experienceRepository.update(entity.id, entity);
        return experienceDTO;
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.experienceRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

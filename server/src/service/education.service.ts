import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EducationDTO } from '../service/dto/education.dto';
import { EducationMapper } from '../service/mapper/education.mapper';
import { EducationRepository } from '../repository/education.repository';

const relationshipNames = [];

@Injectable()
export class EducationService {
    logger = new Logger('EducationService');

    constructor(@InjectRepository(EducationRepository) private educationRepository: EducationRepository) {}

    async findById(id: string): Promise<EducationDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.educationRepository.findOne(id, options);
        return EducationMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<EducationDTO>): Promise<EducationDTO | undefined> {
        const result = await this.educationRepository.findOne(options);
        return EducationMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<EducationDTO>): Promise<[EducationDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.educationRepository.findAndCount(options);
        const educationDTO: EducationDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((education) => educationDTO.push(EducationMapper.fromEntityToDTO(education)));
            resultList[0] = educationDTO;
        }
        return resultList;
    }

    async save(educationDTO: EducationDTO): Promise<EducationDTO | undefined> {
        const entity = EducationMapper.fromDTOtoEntity(educationDTO);
        const result = await this.educationRepository.save(entity);
        return EducationMapper.fromEntityToDTO(result);
    }

    async update(educationDTO: EducationDTO): Promise<EducationDTO | undefined> {
        const entity = EducationMapper.fromDTOtoEntity(educationDTO);
        const result = await this.educationRepository.save(entity);
        return EducationMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.educationRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

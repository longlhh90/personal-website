import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { WorkingDTO } from '../service/dto/working.dto';
import { WorkingMapper } from '../service/mapper/working.mapper';
import { WorkingRepository } from '../repository/working.repository';

const relationshipNames = [];

@Injectable()
export class WorkingService {
    logger = new Logger('WorkingService');

    constructor(@InjectRepository(WorkingRepository) private workingRepository: WorkingRepository) {}

    async findById(id: string): Promise<WorkingDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.workingRepository.findOne(id, options);
        return WorkingMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<WorkingDTO>): Promise<WorkingDTO | undefined> {
        const result = await this.workingRepository.findOne(options);
        return WorkingMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<WorkingDTO>): Promise<[WorkingDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.workingRepository.findAndCount(options);
        const workingDTO: WorkingDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((working) => workingDTO.push(WorkingMapper.fromEntityToDTO(working)));
            resultList[0] = workingDTO;
        }
        return resultList;
    }

    async save(workingDTO: WorkingDTO): Promise<WorkingDTO | undefined> {
        const entity = WorkingMapper.fromDTOtoEntity(workingDTO);
        const result = await this.workingRepository.save(entity);
        return WorkingMapper.fromEntityToDTO(result);
    }

    async update(workingDTO: WorkingDTO): Promise<WorkingDTO | undefined> {
        const entity = WorkingMapper.fromDTOtoEntity(workingDTO);
        const result = await this.workingRepository.save(entity);
        return WorkingMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.workingRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

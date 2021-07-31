import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { MeDTO } from '../service/dto/me.dto';
import { MeMapper } from '../service/mapper/me.mapper';
import { MeRepository } from '../repository/me.repository';

const relationshipNames = [];

@Injectable()
export class MeService {
    logger = new Logger('MeService');

    constructor(@InjectRepository(MeRepository) private meRepository: MeRepository) { }

    async findById(id: string): Promise<MeDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.meRepository.findOne(id, options);
        return MeMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<MeDTO>): Promise<MeDTO | undefined> {
        const result = await this.meRepository.findOne(options);
        return MeMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<MeDTO>): Promise<[MeDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.meRepository.findAndCount();
        console.log(resultList);
        const meDTO: MeDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((me) => meDTO.push(MeMapper.fromEntityToDTO(me)));
            resultList[0] = meDTO;
        }
        return resultList;
    }

    async save(meDTO: MeDTO): Promise<MeDTO | undefined> {
        const entity = MeMapper.fromDTOtoEntity(meDTO);
        const result = await this.meRepository.save(entity);
        return MeMapper.fromEntityToDTO(result);
    }

    async update(meDTO: MeDTO): Promise<MeDTO | undefined> {
        const entity = MeMapper.fromDTOtoEntity(meDTO);
        await this.meRepository.update(entity.id, entity);
        return meDTO;
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.meRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

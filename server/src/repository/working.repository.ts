import { EntityRepository, Repository } from 'typeorm';
import { Working } from '../domain/working.entity';

@EntityRepository(Working)
export class WorkingRepository extends Repository<Working> {}

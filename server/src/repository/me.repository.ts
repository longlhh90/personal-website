import { EntityRepository, Repository } from 'typeorm';
import { Me } from '../domain/me.entity';

@EntityRepository(Me)
export class MeRepository extends Repository<Me> {}

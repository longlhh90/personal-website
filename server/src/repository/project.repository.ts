import { EntityRepository, Repository } from 'typeorm';
import { Project } from '../domain/project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {}

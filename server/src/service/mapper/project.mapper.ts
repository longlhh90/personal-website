import { Project } from '../../domain/project.entity';
import { ProjectDTO } from '../dto/project.dto';

/**
 * A Project mapper object.
 */
export class ProjectMapper {
    static fromDTOtoEntity(entityDTO: ProjectDTO): Project {
        if (!entityDTO) {
            return;
        }
        let entity = new Project();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Project): ProjectDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProjectDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

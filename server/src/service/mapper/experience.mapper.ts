import { Experience } from '../../domain/experience.entity';
import { ExperienceDTO } from '../dto/experience.dto';

/**
 * A Experience mapper object.
 */
export class ExperienceMapper {
    static fromDTOtoEntity(entityDTO: ExperienceDTO): Experience {
        if (!entityDTO) {
            return;
        }
        let entity = new Experience();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Experience): ExperienceDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ExperienceDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

import { Education } from '../../domain/education.entity';
import { EducationDTO } from '../dto/education.dto';

/**
 * A Education mapper object.
 */
export class EducationMapper {
    static fromDTOtoEntity(entityDTO: EducationDTO): Education {
        if (!entityDTO) {
            return;
        }
        let entity = new Education();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Education): EducationDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new EducationDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

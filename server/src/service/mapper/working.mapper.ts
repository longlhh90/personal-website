import { Working } from '../../domain/working.entity';
import { WorkingDTO } from '../dto/working.dto';

/**
 * A Working mapper object.
 */
export class WorkingMapper {
    static fromDTOtoEntity(entityDTO: WorkingDTO): Working {
        if (!entityDTO) {
            return;
        }
        let entity = new Working();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Working): WorkingDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new WorkingDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

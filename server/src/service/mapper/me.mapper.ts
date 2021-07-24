import { Me } from '../../domain/me.entity';
import { MeDTO } from '../dto/me.dto';

/**
 * A Me mapper object.
 */
export class MeMapper {
    static fromDTOtoEntity(entityDTO: MeDTO): Me {
        if (!entityDTO) {
            return;
        }
        let entity = new Me();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Me): MeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new MeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

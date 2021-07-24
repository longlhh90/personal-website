/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Education.
 */
@Entity('education')
export class Education extends BaseEntity {
    @Column({ name: 'institution' })
    institution: string;

    @Column({ name: 'country_name', nullable: true })
    countryName: string;

    @Column({ type: 'integer', name: 'year_graduate' })
    yearGraduate: number;

    @Column({ name: 'major' })
    major: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

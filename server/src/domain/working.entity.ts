/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Working.
 */
@Entity('working')
export class Working extends BaseEntity {
    @Column({ name: 'position' })
    position: string;

    @Column({ name: 'company' })
    company: string;

    @Column({ name: 'country_name' })
    countryName: string;

    @Column({ type: 'integer', name: 'start_month' })
    startMonth: number;

    @Column({ type: 'integer', name: 'start_year' })
    startYear: number;

    @Column({ type: 'integer', name: 'end_month', nullable: true })
    endMonth: number;

    @Column({ type: 'integer', name: 'end_year', nullable: true })
    endYear: number;

    @Column({ type: 'boolean', name: 'is_present' })
    isPresent: boolean;

    @Column({ type: 'blob', name: 'work_duty' })
    workDuty: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

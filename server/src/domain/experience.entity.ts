/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Experience.
 */
@Entity('experience')
export class Experience extends BaseEntity {
    @Column({ name: 'title', nullable: true })
    title: string;

    @Column({ name: 'major', nullable: true })
    major: string;

    @Column({ name: 'organization' })
    organization: string;

    @Column({ name: 'location' })
    location: string;

    @Column({ type: 'integer', name: 'startMonth' })
    startMonth: number;

    @Column({ type: 'integer', name: 'startYear' })
    startYear: number;

    @Column({ type: 'integer', name: 'endMonth', nullable: true })
    endMonth: number;

    @Column({ type: 'integer', name: 'endYear', nullable: true })
    endYear: number;

    @Column({ type: 'boolean', name: 'isPresent' })
    isPresent: boolean;

    @Column({ type: 'blob', name: 'details' })
    details: any;

    @Column({ name: 'expType' })
    expType: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

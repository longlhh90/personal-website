/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Project.
 */
@Entity('project')
export class Project extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'demo_url' })
    demoURL: string;

    @Column({ type: 'blob', name: 'jhi_desc' })
    desc: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

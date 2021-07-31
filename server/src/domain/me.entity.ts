/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Me.
 */
@Entity('me')
export class Me extends BaseEntity {
    @Column({ name: 'formalName' })
    formalName: string;

    @Column({ name: 'legalName' })
    legalName: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'linkedin', nullable: true })
    linkedin: string;

    @Column({ name: 'facebook', nullable: true })
    facebook: string;

    @Column({ name: 'instagram', nullable: true })
    instagram: string;

    @Column({ name: 'github', nullable: true })
    github: string;

    @Column({ name: 'resume', nullable: true })
    resume: string;

    @Column({ type: 'blob', name: 'aboutMe' })
    aboutMe: any;

    @Column({ type: 'blob', name: 'aboutMeShort' })
    aboutMeShort: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

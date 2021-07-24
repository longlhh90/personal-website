/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Me.
 */
@Entity('me')
export class Me extends BaseEntity {
    @Column({ name: 'formal_name' })
    formalName: string;

    @Column({ name: 'legal_name' })
    legalName: string;

    @Column({ type: 'date', name: 'dob', nullable: true })
    dob: any;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'linkedin', nullable: true })
    linkedin: string;

    @Column({ name: 'facebook', nullable: true })
    facebook: string;

    @Column({ name: 'instagram', nullable: true })
    instagram: string;

    @Column({ name: 'resume', nullable: true })
    resume: string;

    @Column({ type: 'blob', name: 'about_me' })
    aboutMe: any;

    @Column({ type: 'blob', name: 'about_me_short' })
    aboutMeShort: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

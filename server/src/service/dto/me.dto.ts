/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A Me DTO object.
 */
export class MeDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'formalName field' })
    formalName: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'legalName field' })
    legalName: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'email field' })
    email: string;

    @ApiModelProperty({ description: 'linkedin field', required: false })
    linkedin: string;

    @ApiModelProperty({ description: 'facebook field', required: false })
    facebook: string;

    @ApiModelProperty({ description: 'instagram field', required: false })
    instagram: string;

    @ApiModelProperty({ description: 'github field', required: false })
    github: string;

    @ApiModelProperty({ description: 'resume field', required: false })
    resume: string;

    @ApiModelProperty({ description: 'aboutMe field' })
    aboutMe: any;

    @ApiModelProperty({ description: 'aboutMeShort field' })
    aboutMeShort: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

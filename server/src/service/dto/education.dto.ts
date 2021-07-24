/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A Education DTO object.
 */
export class EducationDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'institution field' })
    institution: string;

    @ApiModelProperty({ description: 'countryName field', required: false })
    countryName: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'yearGraduate field' })
    yearGraduate: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'major field' })
    major: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

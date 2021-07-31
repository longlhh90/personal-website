/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A Experience DTO object.
 */
export class ExperienceDTO extends BaseDTO {
    @ApiModelProperty({ description: 'title field', required: false })
    title: string;

    @ApiModelProperty({ description: 'major field', required: false })
    major: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'organization field' })
    organization: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'location field' })
    location: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'startMonth field' })
    startMonth: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'startYear field' })
    startYear: number;

    @ApiModelProperty({ description: 'endMonth field', required: false })
    endMonth: number;

    @ApiModelProperty({ description: 'endYear field', required: false })
    endYear: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'isPresent field' })
    isPresent: boolean;

    @ApiModelProperty({ description: 'details field' })
    details: any;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'expType field' })
    expType: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

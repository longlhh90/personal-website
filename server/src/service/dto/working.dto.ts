/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A Working DTO object.
 */
export class WorkingDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'position field' })
    position: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'company field' })
    company: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'countryName field' })
    countryName: string;

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

    @ApiModelProperty({ description: 'workDuty field' })
    workDuty: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

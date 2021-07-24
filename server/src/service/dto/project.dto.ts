/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A Project DTO object.
 */
export class ProjectDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'demoURL field' })
    demoURL: string;

    @ApiModelProperty({ description: 'desc field' })
    desc: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

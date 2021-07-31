import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ExperienceDTO } from '../../service/dto/experience.dto';
import { ExperienceService } from '../../service/experience.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/experiences')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('experiences')
export class ExperienceController {
    logger = new Logger('ExperienceController');

    constructor(private readonly experienceService: ExperienceService) { }

    @Get('/')
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ExperienceDTO,
    })
    async getAll(@Req() req: Request): Promise<ExperienceDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.experienceService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ExperienceDTO,
    })
    async getOne(@Param('id') id: string): Promise<ExperienceDTO> {
        return await this.experienceService.findById(id);
    }

    @PostMethod('/')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create experience' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ExperienceDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() experienceDTO: ExperienceDTO): Promise<ExperienceDTO> {
        const created = await this.experienceService.save(experienceDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Experience', created.id);
        return created;
    }

    @Put('/')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update experience' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ExperienceDTO,
    })
    async put(@Req() req: Request, @Body() experienceDTO: ExperienceDTO): Promise<ExperienceDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Experience', experienceDTO.id);
        return await this.experienceService.update(experienceDTO);
    }

    @Put('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update experience with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ExperienceDTO,
    })
    async putId(@Req() req: Request, @Body() experienceDTO: ExperienceDTO): Promise<ExperienceDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Experience', experienceDTO.id);
        return await this.experienceService.update(experienceDTO);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete experience' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Experience', id);
        return await this.experienceService.deleteById(id);
    }
}

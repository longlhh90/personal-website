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
import { ProjectDTO } from '../../service/dto/project.dto';
import { ProjectService } from '../../service/project.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/projects')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('projects')
export class ProjectController {
    logger = new Logger('ProjectController');

    constructor(private readonly projectService: ProjectService) { }

    @Get('/')
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProjectDTO,
    })
    async getAll(@Req() req: Request): Promise<ProjectDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.projectService.findAndCount({
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
        type: ProjectDTO,
    })
    async getOne(@Param('id') id: string): Promise<ProjectDTO> {
        return await this.projectService.findById(id);
    }

    @PostMethod('/')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create project' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProjectDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() projectDTO: ProjectDTO): Promise<ProjectDTO> {
        const created = await this.projectService.save(projectDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Project', created.id);
        return created;
    }

    @Put('/')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update project' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProjectDTO,
    })
    async put(@Req() req: Request, @Body() projectDTO: ProjectDTO): Promise<ProjectDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Project', projectDTO.id);
        return await this.projectService.update(projectDTO);
    }

    @Put('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update project with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProjectDTO,
    })
    async putId(@Req() req: Request, @Body() projectDTO: ProjectDTO): Promise<ProjectDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Project', projectDTO.id);
        return await this.projectService.update(projectDTO);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete project' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Project', id);
        return await this.projectService.deleteById(id);
    }
}

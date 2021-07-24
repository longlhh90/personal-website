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
import { WorkingDTO } from '../../service/dto/working.dto';
import { WorkingService } from '../../service/working.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/workings')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('workings')
export class WorkingController {
    logger = new Logger('WorkingController');

    constructor(private readonly workingService: WorkingService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: WorkingDTO,
    })
    async getAll(@Req() req: Request): Promise<WorkingDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.workingService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: WorkingDTO,
    })
    async getOne(@Param('id') id: string): Promise<WorkingDTO> {
        return await this.workingService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create working' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: WorkingDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() workingDTO: WorkingDTO): Promise<WorkingDTO> {
        const created = await this.workingService.save(workingDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Working', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update working' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: WorkingDTO,
    })
    async put(@Req() req: Request, @Body() workingDTO: WorkingDTO): Promise<WorkingDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Working', workingDTO.id);
        return await this.workingService.update(workingDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update working with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: WorkingDTO,
    })
    async putId(@Req() req: Request, @Body() workingDTO: WorkingDTO): Promise<WorkingDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Working', workingDTO.id);
        return await this.workingService.update(workingDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete working' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Working', id);
        return await this.workingService.deleteById(id);
    }
}

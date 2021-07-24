import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { MeDTO } from '../../service/dto/me.dto';
import { MeService } from '../../service/me.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/us')
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('us')
export class MeController {
    logger = new Logger('MeController');

    constructor(private readonly meService: MeService) { }

    @Get('/')
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: MeDTO,
    })
    async getAll(@Req() req: Request): Promise<MeDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.meService.findAndCount({
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
        type: MeDTO,
    })
    async getOne(@Param('id') id: string): Promise<MeDTO> {
        return await this.meService.findById(id);
    }

    @PostMethod('/')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create me' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: MeDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() meDTO: MeDTO): Promise<MeDTO> {
        const created = await this.meService.save(meDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Me', created.id);
        return created;
    }

    @Put('/')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update me' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: MeDTO,
    })
    async put(@Req() req: Request, @Body() meDTO: MeDTO): Promise<MeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Me', meDTO.id);
        return await this.meService.update(meDTO);
    }

    @Put('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update me with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: MeDTO,
    })
    async putId(@Req() req: Request, @Body() meDTO: MeDTO): Promise<MeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Me', meDTO.id);
        return await this.meService.update(meDTO);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete me' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Me', id);
        return await this.meService.deleteById(id);
    }
}

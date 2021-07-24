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
import { EducationDTO } from '../../service/dto/education.dto';
import { EducationService } from '../../service/education.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/educations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('educations')
export class EducationController {
    logger = new Logger('EducationController');

    constructor(private readonly educationService: EducationService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: EducationDTO,
    })
    async getAll(@Req() req: Request): Promise<EducationDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.educationService.findAndCount({
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
        type: EducationDTO,
    })
    async getOne(@Param('id') id: string): Promise<EducationDTO> {
        return await this.educationService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create education' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: EducationDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() educationDTO: EducationDTO): Promise<EducationDTO> {
        const created = await this.educationService.save(educationDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Education', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update education' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: EducationDTO,
    })
    async put(@Req() req: Request, @Body() educationDTO: EducationDTO): Promise<EducationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Education', educationDTO.id);
        return await this.educationService.update(educationDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update education with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: EducationDTO,
    })
    async putId(@Req() req: Request, @Body() educationDTO: EducationDTO): Promise<EducationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Education', educationDTO.id);
        return await this.educationService.update(educationDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete education' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Education', id);
        return await this.educationService.deleteById(id);
    }
}

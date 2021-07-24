import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProjectDTO } from '../src/service/dto/project.dto';
import { ProjectService } from '../src/service/project.service';

describe('Project Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(ProjectService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all projects ', async () => {
        const getEntities: ProjectDTO[] = (await request(app.getHttpServer()).get('/api/projects').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET projects by id', async () => {
        const getEntity: ProjectDTO = (
            await request(app.getHttpServer())
                .get('/api/projects/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create projects', async () => {
        const createdEntity: ProjectDTO = (
            await request(app.getHttpServer()).post('/api/projects').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update projects', async () => {
        const updatedEntity: ProjectDTO = (
            await request(app.getHttpServer()).put('/api/projects').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update projects from id', async () => {
        const updatedEntity: ProjectDTO = (
            await request(app.getHttpServer())
                .put('/api/projects/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE projects', async () => {
        const deletedEntity: ProjectDTO = (
            await request(app.getHttpServer())
                .delete('/api/projects/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

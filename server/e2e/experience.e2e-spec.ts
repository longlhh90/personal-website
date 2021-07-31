import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ExperienceDTO } from '../src/service/dto/experience.dto';
import { ExperienceService } from '../src/service/experience.service';

describe('Experience Controller', () => {
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
            .overrideProvider(ExperienceService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all experiences ', async () => {
        const getEntities: ExperienceDTO[] = (await request(app.getHttpServer()).get('/api/experiences').expect(200))
            .body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET experiences by id', async () => {
        const getEntity: ExperienceDTO = (
            await request(app.getHttpServer())
                .get('/api/experiences/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create experiences', async () => {
        const createdEntity: ExperienceDTO = (
            await request(app.getHttpServer()).post('/api/experiences').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update experiences', async () => {
        const updatedEntity: ExperienceDTO = (
            await request(app.getHttpServer()).put('/api/experiences').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update experiences from id', async () => {
        const updatedEntity: ExperienceDTO = (
            await request(app.getHttpServer())
                .put('/api/experiences/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE experiences', async () => {
        const deletedEntity: ExperienceDTO = (
            await request(app.getHttpServer())
                .delete('/api/experiences/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

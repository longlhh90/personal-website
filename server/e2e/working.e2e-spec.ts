import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { WorkingDTO } from '../src/service/dto/working.dto';
import { WorkingService } from '../src/service/working.service';

describe('Working Controller', () => {
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
            .overrideProvider(WorkingService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all workings ', async () => {
        const getEntities: WorkingDTO[] = (await request(app.getHttpServer()).get('/api/workings').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET workings by id', async () => {
        const getEntity: WorkingDTO = (
            await request(app.getHttpServer())
                .get('/api/workings/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create workings', async () => {
        const createdEntity: WorkingDTO = (
            await request(app.getHttpServer()).post('/api/workings').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update workings', async () => {
        const updatedEntity: WorkingDTO = (
            await request(app.getHttpServer()).put('/api/workings').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update workings from id', async () => {
        const updatedEntity: WorkingDTO = (
            await request(app.getHttpServer())
                .put('/api/workings/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE workings', async () => {
        const deletedEntity: WorkingDTO = (
            await request(app.getHttpServer())
                .delete('/api/workings/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

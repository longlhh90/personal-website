import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { EducationDTO } from '../src/service/dto/education.dto';
import { EducationService } from '../src/service/education.service';

describe('Education Controller', () => {
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
            .overrideProvider(EducationService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all educations ', async () => {
        const getEntities: EducationDTO[] = (await request(app.getHttpServer()).get('/api/educations').expect(200))
            .body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET educations by id', async () => {
        const getEntity: EducationDTO = (
            await request(app.getHttpServer())
                .get('/api/educations/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create educations', async () => {
        const createdEntity: EducationDTO = (
            await request(app.getHttpServer()).post('/api/educations').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update educations', async () => {
        const updatedEntity: EducationDTO = (
            await request(app.getHttpServer()).put('/api/educations').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update educations from id', async () => {
        const updatedEntity: EducationDTO = (
            await request(app.getHttpServer())
                .put('/api/educations/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE educations', async () => {
        const deletedEntity: EducationDTO = (
            await request(app.getHttpServer())
                .delete('/api/educations/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

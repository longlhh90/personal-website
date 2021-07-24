import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { MeDTO } from '../src/service/dto/me.dto';
import { MeService } from '../src/service/me.service';

describe('Me Controller', () => {
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
            .overrideProvider(MeService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all us ', async () => {
        const getEntities: MeDTO[] = (await request(app.getHttpServer()).get('/api/us').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET us by id', async () => {
        const getEntity: MeDTO = (
            await request(app.getHttpServer())
                .get('/api/us/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create us', async () => {
        const createdEntity: MeDTO = (await request(app.getHttpServer()).post('/api/us').send(entityMock).expect(201))
            .body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update us', async () => {
        const updatedEntity: MeDTO = (await request(app.getHttpServer()).put('/api/us').send(entityMock).expect(201))
            .body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update us from id', async () => {
        const updatedEntity: MeDTO = (
            await request(app.getHttpServer())
                .put('/api/us/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE us', async () => {
        const deletedEntity: MeDTO = (
            await request(app.getHttpServer())
                .delete('/api/us/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});

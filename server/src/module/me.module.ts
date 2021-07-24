import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeController } from '../web/rest/me.controller';
import { MeRepository } from '../repository/me.repository';
import { MeService } from '../service/me.service';

@Module({
    imports: [TypeOrmModule.forFeature([MeRepository])],
    controllers: [MeController],
    providers: [MeService],
    exports: [MeService],
})
export class MeModule { }

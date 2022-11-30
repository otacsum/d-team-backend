import {Module} from '@nestjs/common';
import {Healthcheck} from './healthcheck.model';
import {HealthcheckService} from './healthcheck.service';
import {HealthcheckController} from './healthcheck.controller';
import {SequelizeModule} from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Healthcheck])],
    controllers: [HealthcheckController],
    providers: [HealthcheckService],
})
export class HealthcheckModule {}

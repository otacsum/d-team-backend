import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {HealthcheckModule} from './healthcheck/healthcheck.module';
import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {SequelizeConfigService} from './config/sequelize.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            useClass: SequelizeConfigService,
        }),
        HealthcheckModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}

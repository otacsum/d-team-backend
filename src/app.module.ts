import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {HealthcheckModule} from './healthcheck/healthcheck.module';
import {Healthcheck} from './models/healthcheck.model';
import {Module, Injectable} from '@nestjs/common';
import {SequelizeModule, SequelizeOptionsFactory, SequelizeModuleOptions} from '@nestjs/sequelize';

@Injectable()
class SequelizeConfigService implements SequelizeOptionsFactory {
    createSequelizeOptions(): SequelizeModuleOptions {
        if (process.env.ENVIRONMENT == 'local') {
            return {
                dialect: 'postgres',
                host: process.env.DATABASE_URL,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME,
                schema: process.env.DATABASE_SCHEMA,
                models: [Healthcheck],
                synchronize: false,
                retryAttempts: 3,
                omitNull: true,
            }
        } else {
            return {
                dialect: 'postgres',
                uri: process.env.DATABASE_URL,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
                models: [Healthcheck],
                synchronize: false,
                retryAttempts: 3,
                omitNull: true,
            }
        }
    }
}

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


import {Injectable} from '@nestjs/common';
import {SequelizeOptionsFactory, SequelizeModuleOptions} from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
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
                autoLoadModels: true, 
                synchronize: false,
                retryAttempts: 3,
                omitNull: true,
            }
        } else {
            return {
                dialect: 'postgres',
                uri: process.env.HEROKU_POSTGRESQL_WHITE_URL,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
                autoLoadModels: true,
                synchronize: false,
                retryAttempts: 3,
                omitNull: true,
            }
        }
    }
}

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {HealthcheckModule} from './healthcheck/healthcheck.module';
import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {SequelizeConfigService} from './config/sequelize.config';
import {PersonModule} from './person/person.module';
import { TeacherCredentialModule } from './teacher-credential/teacher-credential.module';
import { CourseModule } from './course/course.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            useClass: SequelizeConfigService,
        }),
        HealthcheckModule,
        PersonModule,
        TeacherCredentialModule,
        CourseModule,
        AssignmentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}

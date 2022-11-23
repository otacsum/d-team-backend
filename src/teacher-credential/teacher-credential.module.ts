import {Module} from '@nestjs/common';
import {TeacherCredentialService} from './teacher-credential.service';
import {TeacherCredentialController} from './teacher-credential.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {TeacherCredential} from 'src/models/teachercredential.model';

@Module({
    imports: [SequelizeModule.forFeature([TeacherCredential])],
    controllers: [TeacherCredentialController],
    providers: [TeacherCredentialService]
})
export class TeacherCredentialModule {}

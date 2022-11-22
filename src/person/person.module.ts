import {Module} from '@nestjs/common';
import {PersonService} from './person.service';
import {PersonController} from './person.controller';
import {Person} from '..//models/person.model';
import {SequelizeModule} from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Person])],
    controllers: [PersonController],
    providers: [PersonService]
})
export class PersonModule {}

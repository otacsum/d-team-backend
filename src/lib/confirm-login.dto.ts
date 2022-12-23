import { PartialType } from '@nestjs/mapped-types';
import { ConfirmDto } from './confirm.dto';
import {Person} from 'src/person/models/person.model';

export class ConfirmLoginDto extends PartialType(ConfirmDto) {
    person?: Person;
}

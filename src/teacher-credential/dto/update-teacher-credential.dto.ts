import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherCredentialDto } from './create-teacher-credential.dto';

export class UpdateTeacherCredentialDto extends PartialType(CreateTeacherCredentialDto) {}

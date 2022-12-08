import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentGradeDto } from './create-assignment-grade.dto';

export class UpdateAssignmentGradeDto extends PartialType(CreateAssignmentGradeDto) {}

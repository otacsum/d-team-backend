import {Module} from '@nestjs/common';
import {AssignmentGradeService} from './assignment-grade.service';
import {AssignmentGradeController} from './assignment-grade.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import { AssignmentGrade } from './models/assignment-grade.model';

@Module({
    imports: [SequelizeModule.forFeature([AssignmentGrade])],
    controllers: [AssignmentGradeController],
    providers: [AssignmentGradeService]
})
export class AssignmentGradeModule {}

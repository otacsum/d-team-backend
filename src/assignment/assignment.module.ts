import {Module} from '@nestjs/common';
import {AssignmentService} from './assignment.service';
import {AssignmentController} from './assignment.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Course} from 'src/course/models/course.model';
import {CourseAssignment} from './models/assignment.model';
import {CourseStudent} from 'src/course/models/course-student.model';

@Module({
    imports: [SequelizeModule.forFeature([CourseAssignment, Course, CourseStudent])],
    controllers: [AssignmentController],
    providers: [AssignmentService]
})
export class AssignmentModule {}

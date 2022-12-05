import {Module} from '@nestjs/common';
import {AssignmentService} from './assignment.service';
import {AssignmentController} from './assignment.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Course} from 'src/course/models/course.model';
import {CourseAssignment} from './models/assignment.model';

@Module({
    imports: [SequelizeModule.forFeature([CourseAssignment, Course])],
    controllers: [AssignmentController],
    providers: [AssignmentService]
})
export class AssignmentModule {}

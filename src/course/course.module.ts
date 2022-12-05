import {Module} from '@nestjs/common';
import {CourseService} from './course.service';
import {CourseController} from './course.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Course} from './models/course.model';
import {CourseStudent} from './models/course-student.model';

@Module({
    imports: [SequelizeModule.forFeature([Course, CourseStudent])],
    controllers: [CourseController],
    providers: [CourseService]
})
export class CourseModule {}

import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {CourseService} from './course.service';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    /** ---------------- */
    /** Course Functions */
    /** ---------------- */
    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.create(createCourseDto);
    }

    @Get()
    findAll() {
        return this.courseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.courseService.remove(id);
    }



    /** ------------------------ */
    /** Course Students Fuctions */
    /** ------------------------ */
    @Post(':courseId/students/:studentId')
    addToCourse(
        @Param('courseId') courseId: string,
        @Param('studentId') studentId: string) {
        return this.courseService.addStudentToCourse(courseId, studentId);
    }

    @Get(':courseId/students')
    findAllStudentsInCourse(@Param('courseId') courseId: string) {
        return this.courseService.findAllStudentsInCourse(courseId);
    }

    @Get(':courseId/students/:studentId')
    findOneStudentInCourse(
        @Param('courseId') courseId: string,
        @Param('studentId') studentId: string) {
        return this.courseService.findOneStudentInCourse(courseId, studentId);
    }

    @Get('students/:registrationId')
    findOneStudentInCourseById(@Param('registrationId') id: string) {
        return this.courseService.findOneStudentInCourseById(id);
    }

    @Delete(':courseId/students/:studentId')
    removeStudentFromCourse(
        @Param('courseId') courseId: string,
        @Param('studentId') studentId: string) {
        return this.courseService.removeStudentFromCourse(courseId, studentId);
    }

    @Delete('students/:registrationId')
    removeStudentFromCourseById(@Param('registrationId') id: string) {
        return this.courseService.removeStudentFromCourseById(id);
    }
}

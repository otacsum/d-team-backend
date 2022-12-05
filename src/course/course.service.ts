import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ConfirmDto} from 'src/lib/confirm.dto';
import {Course} from './models/course.model';
import {Person} from 'src/person/models/person.model';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';
import {CourseStudent} from './models/course-student.model';

@Injectable()
export class CourseService {

    constructor(
        @InjectModel(Course)
        private courseModel: typeof Course,

        @InjectModel(CourseStudent)
        private courseStudentModel: typeof CourseStudent,
    ) {}


    /** ---------------- */
    /** Course Functions */
    /** ---------------- */
    async create(createCourseDto: CreateCourseDto) {
        let returnPayload: ConfirmDto;
        try {
            //TODO: Create method to validate start date comes before end date.
            await this.courseModel
                .create(createCourseDto as any)
                .then(results => {
                    returnPayload = {
                        id: results.id,
                        createdAt: results.createdAt,
                        success: true,
                        message: 'Created'
                    }
                });
        } catch (err) {
            returnPayload = this.generateFriendlyError(err);
        }
        // return either the payload or an outer error.
        return returnPayload;
    }

    async findAll() {
        try {
            return await this.courseModel.findAll({
                include: {
                    model: Person,
                    attributes: [
                        'first_name',
                        'last_name',
                        'email',
                    ],
                },
            });
        } catch (err) {
            return err;
        }
    }

    async findOne(id: string) {
        try {
            const course = await this.courseModel.findOne({
                where: {
                    id: id,
                    is_active: true
                },
                include: {
                    model: Person,
                    attributes: [
                        'first_name',
                        'last_name',
                        'email',
                    ],
                },
            });

            if (course) {
                return course;
            } else {
                throw new NotFoundException;
            }
        } catch (err) {
            return err;
        }
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        let returnPayload: ConfirmDto;
        try {
            await this.courseModel
                .update(updateCourseDto as any, {
                    where: {
                        id: id
                    }
                })
                .then(results => {
                    returnPayload = {
                        success: true,
                        message: `Course id: (${id}) updated`
                    }
                });
        } catch (err) {
            returnPayload = this.generateFriendlyError(err)
        }
        return returnPayload;
    }

    async remove(id: string) {
        let returnPayload: ConfirmDto;
        try {
            await this.courseModel
                .update(
                    {
                        is_active: false
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                )
                .then(results => {
                    returnPayload = {
                        success: true,
                        message: `Course id: (${id}) deactivated`
                    }
                });
        } catch (err) {
            returnPayload = this.generateFriendlyError(err)
        }
        return returnPayload;
    }


    /** ------------------------ */
    /** Course Students Fuctions */
    /** ------------------------ */
    async addStudentToCourse(courseId: string, studentId: string) {
        let returnPayload: ConfirmDto;
        try {
            //TODO: Create method to validate start date comes before end date.
            await this.courseStudentModel
                .create({
                    course_id: courseId,
                    person_id: studentId,
                })
                .then(results => {
                    returnPayload = {
                        id: results.id,
                        createdAt: results.createdAt,
                        success: true,
                        message: `Student id: (${results.person_id}) added to Course (${results.course_id})`
                    }
                });
        } catch (err) {
            returnPayload = this.generateFriendlyError(err);
        }
        // return either the payload or an outer error.
        return returnPayload;
    }

    async findAllStudentsInCourse(courseId: string) {
        try {
            return await this.courseModel.findAll({
                include: [
                    {
                        model: Person,  // Instructor Join
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'email',
                        ],
                    },
                    {
                        model: CourseStudent,  // Student Registration Join
                        attributes: [
                            'id',
                            'createdAt',
                            'updatedAt',
                        ],
                        where: {
                            is_active: true,
                        },
                        include: [
                            {
                                model: Person,  // Students Join
                                attributes: [
                                    'id',
                                    'first_name',
                                    'last_name',
                                    'email',
                                ],
                            },
                        ],
                    },
                ],
                where: {
                    id: courseId
                },
            });
        } catch (err) {
            return err;
        }
    }

    async findOneStudentInCourse(courseId: string, studentId: string) {
        try {
            const courseStudent = await this.courseStudentModel.findOne({
                where: {
                    course_id: courseId,
                    person_id: studentId,
                    is_active: true
                },
                include: {
                    model: Person,
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'email',
                    ],
                },
            });

            if (courseStudent) {
                return courseStudent;
            } else {
                throw new NotFoundException;
            }
        } catch (err) {
            return err;
        }
    }

    async findOneStudentInCourseById(id: string) {
        try {
            const courseStudent = await this.courseStudentModel.findOne({
                where: {
                    id: id
                },
                include: {
                    model: Person,
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'email',
                    ],
                },
            });

            if (courseStudent) {
                return courseStudent;
            } else {
                throw new NotFoundException;
            }
        } catch (err) {
            return err;
        }
    }

    async removeStudentFromCourse(courseId: string, studentId: string) {
        let returnPayload: ConfirmDto;
        try {
            await this.courseStudentModel
                .update(
                    {
                        is_active: false
                    },
                    {
                        where: {
                            course_id: courseId,
                            person_id: studentId,
                        }
                    }
                )
                .then(results => {
                    returnPayload = {
                        success: true,
                        message: `Student id: (${studentId}) removed from Course (${courseId})`
                    }
                });
        } catch (err) {
            returnPayload = this.generateFriendlyError(err)
        }
        return returnPayload;
    }

    async removeStudentFromCourseById(id: string) {
        let returnPayload: ConfirmDto;
        try {
            await this.courseStudentModel
                .update(
                    {
                        is_active: false
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                )
                .then(results => {
                    returnPayload = {
                        success: true,
                        message: `Student registration: (${id}) deactivated`
                    }
                });
        } catch (err) {
            returnPayload = this.generateFriendlyError(err)
        }
        return returnPayload;
    }



    /**
     * Helper Function
     * @param err Caught Error
     * @returns Object containing error details.
     */
    private generateFriendlyError(err: any) {
        let payload;
        try {
            const errorMessage: string = `Failed: ${err.message}`;
            const errorDetail: string = err.original.detail;
            console.log(errorMessage);

            payload = {
                success: false,
                message: errorMessage,
                detail: errorDetail
            }

            // return a good error detail if available
            return payload;
        } catch (err) {
            // catch inner error when detail not available.
            console.log(err.message);
        }
        // create detail of outer error if detail not available.
        payload = {
            success: false,
            message: '',
            detail: err.message
        }
        return payload;
    }
}

import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ConfirmDto} from 'src/lib/confirm.dto';
import {Course} from './models/course.model';
import {Person} from 'src/person/models/person.model';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';
import {CourseStudent} from './models/course-student.model';
import {Sequelize} from 'sequelize';
import {group} from 'console';
import {resolve} from 'path';
import {AssignmentGrade} from 'src/assignment-grade/models/assignment-grade.model';
import {CourseAssignment} from 'src/assignment/models/assignment.model';

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

    async findAll(isActive: boolean) {
        try {
            let courses = await this.courseModel.findAll({
                attributes: {
                    include: [
                        '*',
                        [Sequelize.literal('(SELECT COUNT(person_id) from "CourseStudents" WHERE "CourseStudents".course_id = "Course".id AND "CourseStudents".is_active = true GROUP BY "CourseStudents".course_id)'), 'student_count'],
                    ],
                },
                include: [
                    {
                        model: Person,
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'email',
                        ],
                    },
                    {
                        model: CourseStudent,
                        attributes: ['person_id'],
                        required: false,
                        where: {
                            is_active: true
                        }
                    },
                ],
                where: {
                    is_active: isActive,
                },
                order: [
                    ['start_date', 'ASC'],
                ]
            })

            courses = JSON.parse(JSON.stringify(courses));

            courses.forEach(course => {
                let student_ids = [];
                course.students.forEach(student => {
                    student_ids.push(student.person_id);
                });
                course['students'] = student_ids;
            });

            return courses;
        } catch (err) {
            return err;
        }
    }

    async findAllByTeacher(teacherId: string) {
        try {
            let courses = await this.courseModel.findAll({
                attributes: {
                    include: [
                        '*',
                        [Sequelize.literal('(SELECT COUNT(person_id) from "CourseStudents" WHERE "CourseStudents".course_id = "Course".id GROUP BY "CourseStudents".course_id)'), 'student_count'],
                    ],
                },
                include: [
                    {
                        model: Person,
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'email',
                        ],
                    },
                ],
                where: {
                    person_id: teacherId,
                    is_active: true,
                },
                order: [
                    ['start_date', 'ASC'],
                ]
            });

            if (courses) {
                return courses;
            } else {
                throw new NotFoundException;
            }
        } catch (err) {
            return err;
        }
    }

    async findAllByStudent(studentId: string) {
        try {
            const courseStudent = await this.courseStudentModel.findAll({
                where: {
                    person_id: studentId,
                    is_active: true
                },
                include: [
                    {
                        model: Course,
                        include: [
                            {
                                model: Person, //Teacher
                                attributes: [
                                    'first_name',
                                    'last_name',
                                    'email'
                                ]
                            },
                            {
                                model: CourseAssignment,
                                attributes: [
                                    'id',
                                    'points_possible'
                                ],
                                where: {
                                    is_active: true
                                },
                                required: false,
                                include: [{
                                    model: AssignmentGrade,
                                    attributes: [
                                        'id',
                                        'points_earned',
                                    ],
                                    where: {
                                        person_id: studentId,
                                        is_active: true,
                                    },
                                    required: false,
                                }]
                            }
                        ],
                    }],
                order: [
                    ['course', 'start_date', 'ASC'],
                ]
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
                attributes: {
                    exclude: ['person_id'],
                },
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

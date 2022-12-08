import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ConfirmDto} from 'src/lib/confirm.dto';
import {Person} from 'src/person/models/person.model';
import {AssignmentGrade} from './models/assignment-grade.model';
import {CreateAssignmentGradeDto} from './dto/create-assignment-grade.dto';
import {UpdateAssignmentGradeDto} from './dto/update-assignment-grade.dto';
import {CourseAssignment} from 'src/assignment/models/assignment.model';
import {Course} from 'src/course/models/course.model';

@Injectable()
export class AssignmentGradeService {

    constructor(
        @InjectModel(AssignmentGrade)
        private gradeModel: typeof AssignmentGrade,
    ) {}


    async create(createAssignmentGradeDto: CreateAssignmentGradeDto) {
        let returnPayload: ConfirmDto;
        try {
            await this.gradeModel
                .create(createAssignmentGradeDto as any)
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
            return await this.gradeModel.findAll({
                attributes: [
                    'id',
                    'points_earned',
                    'is_extra_credit',
                    'createdAt',
                    'updatedAt'
                ],
                where: {
                    is_active: true,
                },
                include: [
                    {
                        model: Person,
                        attributes: [
                            'id',
                            'first_name',
                            'last_name'
                        ],
                    },
                    {
                        model: CourseAssignment,
                        attributes: [
                            'id',
                            'type',
                            'title',
                            'points_possible'
                        ],
                        include: [
                            {
                                model: Course,
                                attributes: [
                                    'id',
                                    'subject_abbreviation',
                                    'code',
                                    'title',
                                ],
                            },
                        ],
                    },
                ],
            });
        } catch (err) {
            return err;
        }
    }

    async findOne(id: string) {
        try {
            const course = await this.gradeModel.findOne({
                attributes: [
                    'id',
                    'points_earned',
                    'is_extra_credit',
                    'createdAt',
                    'updatedAt'
                ],
                where: {
                    id: id,
                    is_active: true,
                },
                include: [
                    {
                        model: Person,
                        attributes: [
                            'id',
                            'first_name',
                            'last_name'
                        ],
                    },
                    {
                        model: CourseAssignment,
                        attributes: [
                            'id',
                            'type',
                            'title',
                            'points_possible'
                        ],
                        include: [
                            {
                                model: Course,
                                attributes: [
                                    'id',
                                    'subject_abbreviation',
                                    'code',
                                    'title',
                                ],
                            },
                        ],
                    },
                ],
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

    async update(id: string, updateAssignmentGradeDto: UpdateAssignmentGradeDto) {
        let returnPayload: ConfirmDto;
        try {
            await this.gradeModel
                .update(updateAssignmentGradeDto as any, {
                    where: {
                        id: id
                    }
                })
                .then(results => {
                    returnPayload = {
                        success: true,
                        message: `Grade id: (${id}) updated`
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
            await this.gradeModel
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

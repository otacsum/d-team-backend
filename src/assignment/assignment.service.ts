import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Course} from 'src/course/models/course.model';
import {CourseAssignment} from './models/assignment.model';
import {CreateAssignmentDto} from './dto/create-assignment.dto';
import {UpdateAssignmentDto} from './dto/update-assignment.dto';
import {ConfirmDto} from 'src/lib/confirm.dto';

@Injectable()
export class AssignmentService {

    constructor(
        @InjectModel(CourseAssignment)
        private assignmentModel: typeof CourseAssignment,

        @InjectModel(Course)
        private courseModel: typeof Course,
    ) {}

    async create(createAssignmentDto: CreateAssignmentDto) {
        let returnPayload: ConfirmDto;
        try {
            await this.assignmentModel
                .create(createAssignmentDto as any)
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
            return await this.assignmentModel.findAll({
                include: {
                    model: Course,
                    attributes: [
                        'subject_abbreviation',
                        'code',
                        'title',
                    ],
                },
            });
        } catch (err) {
            return err;
        }
    }

    async findOne(id: string) {
        try {
            const assignment = await this.assignmentModel.findOne({
                where: {
                    id: id,
                    is_active: true
                },
                include: {
                    model: Course,
                    attributes: [
                        'subject_abbreviation',
                        'code',
                        'title',
                    ],
                },
            });

            if (assignment) {
                return assignment;
            } else {
                throw new NotFoundException;
            }
        } catch (err) {
            return err;
        }
    }

    async update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
        let returnPayload: ConfirmDto;
        try {
            await this.assignmentModel
                .update(updateAssignmentDto as any, {
                    where: {
                        id: id
                    }
                })
                .then(results => {
                    returnPayload = {
                        success: true,
                        message: `Assignment id: (${id}) updated`
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
            await this.assignmentModel
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
                        message: `Assignment id: (${id}) deactivated`
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

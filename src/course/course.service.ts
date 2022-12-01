import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ConfirmDto} from 'src/lib/confirm.dto';
import {Course} from './course.model';
import {Person} from 'src/person/person.model';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';

@Injectable()
export class CourseService {

    constructor(
        @InjectModel(Course)
        private courseModel: typeof Course,
    ) {}

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
                    attributes: {
                        exclude: ['pass_hash']
                    },
                },
            });
        } catch (err) {
            return err;
        }
    }

    async findOne(id: string) {
        try {
            const credential = await this.courseModel.findOne({
                where: {
                    id: id,
                    is_active: true
                },
                include: {
                    model: Person,
                    attributes: {
                        exclude: ['pass_hash']
                    },
                },
            });

            if (credential) {
                return credential;
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

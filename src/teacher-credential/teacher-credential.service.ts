import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ConfirmDto} from 'src/lib/confirm.dto';
import {Person} from 'src/person/person.model';
import {TeacherCredential} from './teacher-credential.model';
import {CreateTeacherCredentialDto} from './dto/create-teacher-credential.dto';
import {UpdateTeacherCredentialDto} from './dto/update-teacher-credential.dto';

@Injectable()
export class TeacherCredentialService {

    constructor(
        @InjectModel(TeacherCredential)
        private credentialModel: typeof TeacherCredential,
    ) {}

    async create(createTeacherCredentialDto: CreateTeacherCredentialDto) {
        let returnPayload: ConfirmDto;
        try {
            await this.credentialModel
                .create(createTeacherCredentialDto as any)
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
            return await this.credentialModel.findAll({
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
            const credential = await this.credentialModel.findOne({
                where: {
                    id: id,
                    is_active: true
                },
                include: {
                    model: Person,
                    attributes: {
                        exclude: ['pass_hash']
                    },
                }
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

    async update(id: string, updateTeacherCredentialDto: UpdateTeacherCredentialDto) {
        let returnPayload: ConfirmDto;
        try {
            await this.credentialModel
                .update(updateTeacherCredentialDto as any, {
                    where: {
                        id: id
                    }
                })
                .then(results => {
                    returnPayload = {
                        success: true,
                        message: `Credential id: (${id}) updated`
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
            await this.credentialModel
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
                        message: `Credential id: (${id}) deactivated`
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

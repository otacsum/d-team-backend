import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Person} from '../models/person.model';
import {CreatePersonDto} from './dto/create-person.dto';
import {PersonConfirmDto} from './dto/person-confirm.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PersonService {

    constructor(
        @InjectModel(Person)
        private personModel: typeof Person,
    ) {}

    async create(createPersonDto: CreatePersonDto) {
        let returnPayload: PersonConfirmDto;
        try {
            await this.personModel
                .create(createPersonDto as any)
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
            return await this.personModel.findAll({
                attributes: {
                    exclude: ['pass_hash']
                },
            });
        } catch (err) {
            return err;
        }
    }

    async findOne(id: string) {
        try {
            return await this.personModel.findOne({
                where: {
                    id: id,
                    is_active: true
                },
                attributes: {
                    exclude: ['pass_hash']
                },
            });
        } catch (err) {
            return err;
        }
    }

    async update(id: string, updatePersonDto: UpdatePersonDto) {
        let returnPayload: PersonConfirmDto;
        try {
            await this.personModel
                .update(updatePersonDto as any, {
                    where: {
                        id: id
                    }
                })
                .then(results => {
                    returnPayload = {
                        success: true,
                        message: `Person id: (${id}) updated`
                    }
                });
        } catch (err) {
            returnPayload = this.generateFriendlyError(err)
        }
        return returnPayload;
    }

    /**
     * Soft Deletes a person by setting is_active to false
     * @param id UUID of the person whom we are deactivating.
     * @returns Confirmation payload
     */
    async remove(id: string) {
        let returnPayload: PersonConfirmDto;
        try {
            await this.personModel
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
                        message: `Person id: (${id}) deactivated`
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
    generateFriendlyError(err: any) {
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

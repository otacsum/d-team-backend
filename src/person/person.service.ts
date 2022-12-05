import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Person} from './models/person.model';
import {CreatePersonDto} from './dto/create-person.dto';
import {ConfirmDto} from '../lib/confirm.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {LoginDto} from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import {TeacherCredential} from 'src/teacher-credential/models/teacher-credential.model';

@Injectable()
export class PersonService {

    constructor(
        @InjectModel(Person)
        private personModel: typeof Person,
    ) {}

    /**
     * Creates a new person
     * @param createPersonDto JSON body containing values per the model.
     * @returns Confirmation payload
     */
    async create(createPersonDto: CreatePersonDto) {
        let returnPayload: ConfirmDto;
        try {
            createPersonDto.pass_hash = await this
                .hashPassword(createPersonDto.pass_hash);

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

    /**
     * Gets all active people from the database.
     * @returns Array of person objects.
     */
    async findAll() {
        try {
            return await this.personModel.findAll({
                attributes: {
                    exclude: ['pass_hash']
                },
                include: [TeacherCredential],
            });
        } catch (err) {
            return err;
        }
    }

    /**
     * Gets one active person from the database.
     * @param id UUID of the person whom we are requesting.
     * @returns Person object
     */
    async findOne(id: string) {
        try {
            const person = await this.personModel.findOne({
                where: {
                    id: id,
                    is_active: true
                },
                attributes: {
                    exclude: ['pass_hash']
                },
                include: [TeacherCredential],
            });

            if (person) {
                return person;
            } else {
                throw new NotFoundException;
            }
        } catch (err) {
            return err;
        }
    }

    /**
     * Updates one or many values within the person record
     * @param id UUID of the person whom we are changing.
     * @param updatePersonDto JSON body containing one or many values per the model.
     * @returns Confirmation payload
     */
    async update(id: string, updatePersonDto: UpdatePersonDto) {
        let returnPayload: ConfirmDto;
        try {
            if (updatePersonDto.pass_hash) {
                updatePersonDto.pass_hash = await this
                    .hashPassword(updatePersonDto.pass_hash);
            }
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
     * and updating e-mail so it can theoretically be reused.
     * @param id UUID of the person whom we are deactivating.
     * @returns Confirmation payload
     */
    async remove(id: string) {
        let returnPayload: ConfirmDto;
        const person: Person = await this.findOne(id);
        try {
            await this.personModel
                .update(
                    {
                        is_active: false,
                        email: `${person.email}.${new Date().getTime()}.inactive`
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
     * Checks user credentials against the hashed password in the Person table.
     * @param loginDto Object containing username and password to test.
     * @returns Confirmation Payload
     */
    async login(loginDto: LoginDto) {
        let returnPayload: ConfirmDto = {
            success: false,
            message: 'Invalid credentials',
        };
        try {
            await this.getUserByEmail(loginDto.email)
                .then(async person => {
                    await this.comparePassword(
                        loginDto.password,
                        person.pass_hash
                    )
                        .then(isMatch => {
                            if (isMatch) {
                                returnPayload = {
                                    success: true,
                                    message: 'Login successful',
                                };
                            }
                        });
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

    private async getUserByEmail(email: string) {
        try {
            return await this.personModel.findOne({
                where: {
                    email: email,
                    is_active: true
                },
                attributes: ['id', 'pass_hash'],
            });
        } catch (err) {
            return err;
        }
    }

    private async hashPassword(password: string) {
        const saltOrRounds = 14;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    private async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}

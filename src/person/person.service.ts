import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreatedAt} from 'sequelize-typescript';
import {Person} from '../models/person.model';
import {CreatePersonDto} from './dto/create-person.dto';
import {CreatePersonConfirmDto} from './dto/create-person-confirm.dto';
import {UpdatePersonDto} from './dto/update-person.dto';

@Injectable()
export class PersonService {

    constructor(
        @InjectModel(Person)
        private personModel: typeof Person,
    ) {}

    async create(createPersonDto: CreatePersonDto) {
        let returnPayload: CreatePersonConfirmDto;
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
        
            return returnPayload;
        } catch (err) {
            const errorMessage: string = `Failed to create user: ${err}`;
            console.log(err);

            returnPayload = {
                success: false,
                message: errorMessage
            }
        }
    }

    async findAll() {
        return `This action returns all person`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} person`;
    }

    async update(id: number, updatePersonDto: UpdatePersonDto) {
        return `This action updates a #${id} person`;
    }

    async remove(id: number) {
        return `This action removes a #${id} person`;
    }
}

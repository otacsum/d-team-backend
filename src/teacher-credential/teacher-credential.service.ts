import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ConfirmDto} from 'src/lib/confirm.dto';
import {Person} from 'src/models/person.model';
import {TeacherCredential} from '../models/teachercredential.model';
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
                include: [Person],
            });
        } catch (err) {
            return err;
        }
    }

    async findOne(id: number) {
        return `This action returns a #${id} teacherCredential`;
    }

    async update(id: number, updateTeacherCredentialDto: UpdateTeacherCredentialDto) {
        return `This action updates a #${id} teacherCredential`;
    }

    async remove(id: number) {
        return `This action removes a #${id} teacherCredential`;
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

import {IsString, IsUUID} from "class-validator";

export class CreateTeacherCredentialDto {
    id?: string;

    @IsUUID()
    person_id: string;

    @IsString()
    job_title: string;

    @IsString()
    rank: string;

    @IsString()
    credential_type: string;

    @IsString()
    subject_abbreviation: string;

    is_active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

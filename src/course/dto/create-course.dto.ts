import {IsDate, IsNumber, IsString, IsUUID} from "class-validator";

export class CreateCourseDto {
    id?: string;

    @IsUUID()
    person_id: string;

    @IsString()
    subject_abbreviation: string;

    @IsNumber()
    code: number

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    start_date: Date;

    @IsDate()
    end_date: Date;

    is_active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

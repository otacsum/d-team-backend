import {IsDate, IsNumber, IsString, IsUUID} from "class-validator";

export class CreateAssignmentDto {
    id?: string;

    @IsUUID()
    course_id: string;

    @IsString()
    type: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    due_date: Date;

    @IsNumber()
    points_possible: number

    is_active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

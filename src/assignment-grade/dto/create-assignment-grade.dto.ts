import {IsDate, IsNumber, IsString, IsUUID} from "class-validator";

export class CreateAssignmentGradeDto {
    id?: string;

    @IsUUID()
    person_id: string;

    @IsUUID()
    assignment_id: string;

    @IsNumber()
    points_earned: number

    is_extra_credit?: boolean;
    is_active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

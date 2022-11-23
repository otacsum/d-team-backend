import {IsEmail, IsNumber, IsString} from 'class-validator';

export class CreatePersonDto {
    id?: string;

    @IsString()
    type: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    street_address: string;

    @IsString()
    city: string;

    @IsString()
    state_abbreviation: string;

    @IsNumber()
    zip_code: number;

    @IsString()
    pass_hash?: string;

    is_active?: boolean
    createdAt?: Date
    updatedAt?: Date;
}

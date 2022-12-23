import {Column, DataType, Model, PrimaryKey, Table, IsEmail, HasMany} from 'sequelize-typescript';
import {TeacherCredential} from '../../teacher-credential/models/teacher-credential.model';

@Table
export class Person extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    public id;

    @Column
    type: string;

    @Column
    first_name: string;

    @Column
    last_name: string;

    @IsEmail
    @Column
    email: string;

    @Column
    street_address: string;

    @Column
    city: string;

    @Column
    state_abbreviation: string;

    @Column
    zip_code: number;

    @HasMany(() => TeacherCredential)
    credentials: TeacherCredential[];

    @Column
    pass_hash?: string;

    @Column
    is_active: boolean;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}

import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

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

    @Column
    pass_hash: string;

    @Column
    is_active: boolean;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}

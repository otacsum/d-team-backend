import {BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Person} from '../person/person.model';

@Table
export class Course extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    public id;

    @ForeignKey(() => Person)
    @Column({
        type: DataType.UUID
    })
    public person_id;

    @BelongsTo(() => Person)
    person: Person;

    @Column
    subject_abbreviation: string;

    @Column
    code: number;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    start_date: Date;

    @Column
    end_date: Date;

    @Column
    is_active: boolean;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}

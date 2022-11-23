import {BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Person} from './person.model';

@Table
export class TeacherCredential extends Model {
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
    job_title: string;

    @Column
    rank: string;

    @Column
    credential_type: string;

    @Column
    subject_abbreviation: string;

    @Column
    is_active: boolean;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}

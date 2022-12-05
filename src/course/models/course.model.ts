import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CourseStudent} from './course-student.model';
import {Person} from 'src/person/models/person.model';

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
        type: DataType.UUID,
    })
    public person_id;

    @BelongsTo(() => Person)
    instructor: Person;

    @HasMany(() => CourseStudent)
    students: CourseStudent[];

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

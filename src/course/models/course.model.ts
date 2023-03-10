import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CourseStudent} from './course-student.model';
import {Person} from 'src/person/models/person.model';
import {CourseAssignment} from 'src/assignment/models/assignment.model';

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
        type: DataType.UUIDV4,
    })
    public person_id;

    @BelongsTo(() => Person)
    instructor: Person;

    @HasMany(() => CourseStudent)
    students: CourseStudent[] | string[];

    @HasMany(() => CourseAssignment)
    assignments: CourseAssignment[] | string[];

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

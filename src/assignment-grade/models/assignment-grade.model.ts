import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import { CourseAssignment } from 'src/assignment/models/assignment.model';
import {Person} from 'src/person/models/person.model';

@Table
export class AssignmentGrade extends Model {
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
    student: Person;

    @ForeignKey(() => CourseAssignment)
    @Column({
        type: DataType.UUID,
    })
    public assignment_id;

    @BelongsTo(() => CourseAssignment)
    assignment: CourseAssignment;

    @Column
    points_earned: number;

    @Column
    is_extra_credit: boolean;

    @Column
    is_active: boolean;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}

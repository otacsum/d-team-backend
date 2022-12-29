import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {AssignmentGrade} from 'src/assignment-grade/models/assignment-grade.model';
import {Course} from 'src/course/models/course.model';

@Table
export class CourseAssignment extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    public id;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.UUID
    })
    public course_id;

    @BelongsTo(() => Course)
    course: Course;

    @Column({
        type: DataType.STRING,
        validate: {
            isIn: [[
                'assignment',
                'exam',
            ]]
        }
    })
    public type;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    due_date: Date;

    @Column
    points_possible: number;

    @HasMany(() => AssignmentGrade)
    grades: AssignmentGrade[] | string[];

    @Column
    is_active: boolean;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}

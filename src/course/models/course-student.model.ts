import {BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Person} from 'src/person/models/person.model';
import {Course} from 'src/course/models/course.model';

@Table
export class CourseStudent extends Model {
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
    student: Person;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.UUID
    })
    public course_id;

    @BelongsTo(() => Course)
    course: Course;

    @Column
    is_active: boolean;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}

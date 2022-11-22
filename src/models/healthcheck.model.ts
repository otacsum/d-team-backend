import {Column, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table
export class Healthcheck extends Model {
    @PrimaryKey
    @Column
    id?: number;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}

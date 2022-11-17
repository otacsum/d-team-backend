import {Column, Model, Table} from 'sequelize-typescript';

@Table
export class Healthcheck extends Model {
    @Column({primaryKey: true})
    id: number;
}

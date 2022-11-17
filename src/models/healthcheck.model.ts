import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'Healthcheck', createdAt: false, updatedAt: false})
export class Healthcheck extends Model {
    @Column({primaryKey: true})
    id: number;

    @Column
    last_check?: Date;
}

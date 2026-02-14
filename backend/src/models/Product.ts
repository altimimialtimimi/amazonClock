import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column("text")
    description!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;

    @Column()
    category!: string;

    @Column()
    imageUrl!: string;

    @Column("int")
    stock!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

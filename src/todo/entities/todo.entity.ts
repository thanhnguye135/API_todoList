import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({default: false})
    completed: boolean
    
    @ManyToOne(() => User, (user) => user.todos)
    user: User;

}

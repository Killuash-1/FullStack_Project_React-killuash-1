import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";


@Entity("contacts")
class Contact{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "text"})
    name: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, (user) => user.contacts, {onDelete:"CASCADE"})
    user: User;
}

export { Contact };
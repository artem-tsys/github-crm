import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { Project } from "../../project/entities/project.entity";

/**
 * Entity representing a user in the system.
 */
@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@Column({ unique: true })
	email: string;
	
	@Column()
	passwordHash: string;
	
	@CreateDateColumn()
	createdAt: Date;
	
	@ManyToMany(() => Project, project => project.users)
	projects: Project[];
}

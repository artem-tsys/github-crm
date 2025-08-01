import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from "../../user/entities/user.entity";

@Entity('projects')
export class Project {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@Column()
	owner: string;
	
	@Column()
	name: string;
	
	@Column()
	url: string;
	
	@Column()
	stars: number;
	
	@Column()
	forks: number;
	
	@Column()
	issues: number;
	
	@Column({ type: 'bigint' })
	createdAt: number;
	
	@CreateDateColumn()
	addedAt: Date;
	
	@ManyToMany(() => User, user => user.projects)
	@JoinTable({ name: 'user_projects' })
	users: User[];
}

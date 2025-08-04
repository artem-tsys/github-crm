import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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
}

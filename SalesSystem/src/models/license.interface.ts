import { UserDB } from './user.interface';

export interface LicenseDB {
	id: number;
	validityDays: number;
	code: string;
	createFor: string;
	user: UserDB | null;
	activated: boolean;
	expired: Date;
	updatedAt: Date;
	createdAt: Date;
}

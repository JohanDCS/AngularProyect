import { UserWorkerDB } from './userWorker.interface';

export interface AttendanceDB {
	id: number;
	userWorker: UserWorkerDB;
	date: Date;
	updatedAt: Date;
	createdAt: Date;
}

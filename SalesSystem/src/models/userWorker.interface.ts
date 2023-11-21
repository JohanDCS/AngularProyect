import { AttendanceDB } from './attendance.interface';
import { CampusDB } from './campus.interface';

export interface UserWorkerDB {
	id: number;
	name: string;
	fullname: string;
	dni: number;
	email: string;
	password: string;
	salt: string;
	phone: string;
	status: boolean;
	contractDate: Date; // fecha en la que fue contratado
	permissions: Array<string>; // fecha en la que fue contratado
	listAttendance: Array<AttendanceDB>;
	campus: CampusDB;
	updatedAt: Date;
	createdAt: Date;
}

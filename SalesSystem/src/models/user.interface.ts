import { CompanyDB } from './company.interface';
import { LicenseDB } from './license.interface';
export interface UserDB {
	id: number;
	name: string;
	fullname: string;
	email: string;
	password: string;
	salt: string;
	phone: string;
	license: LicenseDB | null;
	companies: Array<CompanyDB>;
	updatedAt: Date;
	createdAt: Date;
}

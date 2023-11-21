import { CompanyDB } from './company.interface';

export interface BrandDB {
	id: number;
	name: string;
	company: CompanyDB;
	updatedAt: Date;
	createdAt: Date;
}

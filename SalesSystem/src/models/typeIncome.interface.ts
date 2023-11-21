import { CompanyDB } from './company.interface';

export interface TypeIncomeDB {
	id: number;
	name: string;
	company: CompanyDB;
	updatedAt: Date;
	createdAt: Date;
}

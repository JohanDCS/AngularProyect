import { CompanyDB } from './company.interface';
import { PriceGroupDB } from './priceGroup.interface';
import { StoreDB } from './store.interface';
import { UserWorkerDB } from './userWorker.interface';

export interface CampusDB {
	id: number;
	name: string;
	address: string;
	details: string;
	inCharge: string; // Nombre de personal a cargo
	tokenAccess: string; // Nombre de personal a cargo
	country: string;
	department: string;
	province: string;
	status: boolean;
	company?: CompanyDB;
	listStore: Array<StoreDB>;
	listWorker: Array<UserWorkerDB>;
	listPriceGroup: Array<PriceGroupDB>;
	updatedAt: Date;
	createdAt: Date;
}

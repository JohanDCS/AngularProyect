import { CampusDB } from './campus.interface';
import { StoreInventoryDB } from './storeInventory.interface';

export interface StoreDB {
	id: number;
	name: string;
	address: string;
	country: string;
	department: string;
	province: string;
	campus: CampusDB;
	inventory: Array<StoreInventoryDB>;
	updatedAt: Date;
	createdAt: Date;
}

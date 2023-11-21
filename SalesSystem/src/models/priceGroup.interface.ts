import { CampusDB } from './campus.interface';
import { PriceDB } from './price.interface';

export interface PriceGroupDB {
	id: number;
	name: string;
	campus: CampusDB;
	prices: Array<PriceDB>;
	updatedAt: Date;
	createdAt: Date;
}

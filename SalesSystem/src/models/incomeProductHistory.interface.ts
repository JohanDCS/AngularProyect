import { StoreDB } from './store.interface';

interface Structure_History_Product {
	code: string;
	name: string;
	details: string;
	quantity: number;
}
export interface IncomeProductHistoryDB {
	id: number;
	listProduct: Array<Structure_History_Product>;
	store: StoreDB;
	userEmail: string;
	typeIncome: string;
	updatedAt: Date;
	createdAt: Date;
}

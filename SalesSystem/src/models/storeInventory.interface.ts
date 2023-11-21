import { ProductDB } from './product.interface';
import { StoreDB } from './store.interface';

export interface StoreInventoryDB {
	id: number;
	product: ProductDB;
	store: StoreDB;
	quantity: number;
	updatedAt: Date;
	createdAt: Date;
}

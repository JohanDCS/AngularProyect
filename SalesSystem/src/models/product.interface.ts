import { CategoryDB } from './category.interface';
import { CompanyDB } from './company.interface';
import { PriceDB } from './price.interface';
import { PriceGroupDB } from './priceGroup.interface';
import { StoreInventoryDB } from './storeInventory.interface';
import { SubCategoryDB } from './subcategory.interface';
import { SupplierDB } from './supplier.interface';

export interface ProductDB {
	id: number;
	code: string;
	name: string;
	details: string;
	marca: string;
	unit: string;
	priceDistributor: number;
	priceProduct: number;
	image: string;
	commission: number;
	tax: boolean;
	expired: boolean;
	stock_min: number;
	stock_max: number;
	status: boolean;
	listCodesExtra: Array<string>;
	category: CategoryDB | null;
	subCategory: SubCategoryDB | null;
	company: CompanyDB;
	supplier: SupplierDB | null;
	listInventory: Array<StoreInventoryDB>;
	prices: Array<PriceDB>;
	updatedAt: Date;
	createdAt: Date;
}

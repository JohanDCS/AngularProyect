import { CompanyDB } from './company.interface';
import { ProductDB } from './product.interface';
import { SubCategoryDB } from './subcategory.interface';

export interface CategoryDB {
	id: number;
	name: string;
	listSubCategory: Array<SubCategoryDB>;
	company: CompanyDB;
	listProduct: Array<ProductDB>;
	updatedAt: Date;
	createdAt: Date;
}

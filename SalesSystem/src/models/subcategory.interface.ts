import { CategoryDB } from './category.interface';
import { ProductDB } from './product.interface';

export interface SubCategoryDB {
	id: number;
	name: string;
	listProduct: Array<ProductDB>;
	category: CategoryDB;
	updatedAt: Date;
	createdAt: Date;
}

import { CompanyDB } from './company.interface';
import { ProductDB } from './product.interface';
import { UserDB } from './user.interface';

export interface SupplierDB {
	id: number;
	ruc: number;
	name: string;
	address: string;
	details: string;
	status: boolean;
	company: CompanyDB;
	product: Array<ProductDB>;
	updatedAt: Date;
	createdAt: Date;
}

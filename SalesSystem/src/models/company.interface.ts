import { BrandDB } from './brand.interface';
import { CampusDB } from './campus.interface';
import { CategoryDB } from './category.interface';
import { ProductDB } from './product.interface';
import { SUNAT_DATA } from './sunat.interface';
import { SupplierDB } from './supplier.interface';
import { TypeIncomeDB } from './typeIncome.interface';
import { UserDB } from './user.interface';

export interface CompanyDB {
	id: number;
	name: string;
	ruc: number;
	address: string;
	details: string;
	country: string;
	department: string;
	province: string;
	web: string;
	email: string;
	phone: number;
	image: string;
	sunat: SUNAT_DATA;
	listCategory: Array<CategoryDB>;
	user?: UserDB;
	listCampus: Array<CampusDB>;
	listProducts: Array<ProductDB>;
	listBrands: Array<BrandDB>;
	listSupppier: Array<SupplierDB>;
	listTypeIncome: Array<TypeIncomeDB>;
	updatedAt: Date;
	createdAt: Date;
}

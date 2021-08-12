import { ProductList, User, Status } from './types';

export interface Store {
	user: User;
	products: {
		fetchProducts: { listById: ProductList };
		homeList: { list: string[]; status: Status };
		algoliaResults: string[];
		search?: {
			status: Status;
			list: string[];
			filter?: string[];
			query?: string;
		};
	};
	cart: { list: string[] };
	selectedAddress: number;
	loader: boolean;
}

interface Address {
	addressProps?: {
		nickName: "Home" | "Office" | "Others";
		name: string;
		othersLabel?: string
		houseNum: string;
		street: string;
	}
	location: string;
}
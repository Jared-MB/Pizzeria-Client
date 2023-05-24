export interface ChildrenProps {
	children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

export enum LocalStorageKeys {
	EMPLOYEE = 'employee'
}

export const Routes = {
	ROOT: '',
	LOGIN: 'login',
	DASHBOARD: 'dashboard',
	CLIENTS: 'clients',
	ADD_CLIENT: 'add',
	PRODUCTS: 'products',
	ADD_PRODUCT: 'add',
	ADD_ORDER: 'add-order',
}

export interface TLogin {
	username: string
	password: string
}

export interface ServerResponse<T = void> {
	status: number;
	message: string;
	[key: string]: T | string | number;
}
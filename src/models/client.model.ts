export interface TClient {
	_id: string;
	name: string;
	address: string;
	phone: number;
}

export const EmptyClient: TClient = {
	_id: '',
	address: '',
	name: '',
	phone: 0,
}
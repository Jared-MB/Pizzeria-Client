export interface TProduct {
	name: string
	price: number
	description?: string
	size?: string
	stock: number
	_id?: string
}

export interface TProductWithQuantity extends TProduct {
	quantity: number
}
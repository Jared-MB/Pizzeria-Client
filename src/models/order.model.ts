import { TProductWithQuantity } from './product.model'

export interface TOrder {
	products: TProductWithQuantity[]
	client: string
	paymentMethod: 'cash' | 'card'
	type: 'delivery' | 'pickup' | 'inStore'
	status: 'pending' | 'finished' | 'canceled'
	_id?: string
}

export const EmptyOrder: TOrder = {
	products: [] as TProductWithQuantity[],
	client: '',
	paymentMethod: 'cash',
	type: 'delivery',
	status: 'pending',
}
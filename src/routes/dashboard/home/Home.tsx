import { useAppDispatch, useAppSelector } from 'src/redux'
import { fetchOrders } from 'src/redux/slices/orderSlice'
import { fetchClients } from 'src/redux/slices/clientSlice'
import { Routes, TClient, TProductWithQuantity } from 'src/models'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

	const dispatch = useAppDispatch()


	const orders = useAppSelector(state => state.orders)
	const clients = useAppSelector(state => state.clients)

	const searchClient = (id: string): TClient => {
		const client = clients.find(client => client._id === id)
		return client as TClient
	}

	useEffect(() => {
		dispatch(fetchClients())
		dispatch(fetchOrders())
	}, [])

	const calculateTotal = (shoppingCart: TProductWithQuantity[]) => {
		let total = 0
		shoppingCart.forEach(product => {
			total += product.price * product.quantity
		})
		return total
	}

	return (
		<>
			<header className='flex justify-between items-center p-4'>
				<h2 className='text-xl text-purple-700'>Últimos pedidos</h2>
				<Link to={Routes.ADD_ORDER} className='px-2 py-1 bg-purple-700 rounded text-white'>Agregar pedido</Link>
			</header >
			<ul className='grid grid-cols-3 text-purple-700 font-medium px-4'>
				<li>
					Cliente
				</li>
				<li>
					Productos
				</li>
				<li>
					Total
				</li>
			</ul>
			<ul className='flex flex-col px-4 gap-2'>
				{orders.map(order => (
					<li key={order._id} className='grid grid-cols-3 hover:bg-zinc-300 px-2 py-1 rounded'>
						<span>{searchClient(order.client).name}</span>
						<ul>
							{order.products.map(product => (
								<li key={product._id}>
									{product.name}
								</li>
							))}
						</ul>
						<span>
							${calculateTotal(order.products)}
						</span>
					</li>
				))}
			</ul>
		</>
	)
}
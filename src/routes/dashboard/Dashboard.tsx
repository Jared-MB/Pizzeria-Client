import { Route } from 'react-router-dom'
import { RoutesWithNotFound } from 'src/components'
import { Routes } from 'src/models'
import { Home, Clients, Products } from '.'
import { Layout } from './components'
import { AddOrder } from './orders'
import { useAppDispatch } from 'src/redux'
import { fetchProducts } from 'src/redux/slices/productSlice'

export default function Dashboard() {

	const dispatch = useAppDispatch()

	dispatch(fetchProducts())

	return (
		<RoutesWithNotFound>
			<Route element={<Layout />}>
				<Route path={Routes.ROOT} element={<Home />} />
				<Route path={Routes.ADD_ORDER} element={<AddOrder />} />
				<Route path={`${Routes.CLIENTS}/*`} element={<Clients />} />
				<Route path={`${Routes.PRODUCTS}/*`} element={<Products />} />
			</Route>
		</RoutesWithNotFound>
	)
}
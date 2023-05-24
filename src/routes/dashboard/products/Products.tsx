import { RoutesWithNotFound } from 'src/components'
import Home from './Home'
import { Route } from 'react-router-dom'
import { Routes } from 'src/models'
import AddProduct from './AddProduct'

export default function Products() {
	return (
		<RoutesWithNotFound>
			<Route path={Routes.ROOT} element={<Home />} />
			<Route path={Routes.ADD_PRODUCT} element={<AddProduct />} />
		</RoutesWithNotFound>
	)
}
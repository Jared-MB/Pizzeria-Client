import { RoutesWithNotFound } from 'src/components'
import { AddClient } from '.'
import { Route } from 'react-router-dom'
import { Routes } from 'src/models'
import Home from './Home'

export default function Clients() {
	return (
		<RoutesWithNotFound>
			<Route path={Routes.ROOT} element={<Home />} />
			<Route path={Routes.ADD_CLIENT} element={<AddClient />} />
		</RoutesWithNotFound>
	)
}
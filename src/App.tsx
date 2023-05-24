import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Login } from 'src/routes'
import { RoutesWithNotFound } from './components'
import AuthGuard from './guards/AuthGuard'
import { Routes } from './models'
import { Dashboard } from './routes/dashboard'

function App() {

	return (
		<BrowserRouter>
			<RoutesWithNotFound>
				<Route path={Routes.ROOT} element={<Navigate to={Routes.DASHBOARD} replace />} />
				<Route path={Routes.LOGIN} element={<Login />} />
				<Route element={<AuthGuard />}>
					<Route path={`${Routes.DASHBOARD}/*`} element={<Dashboard />} />
				</Route>
			</RoutesWithNotFound>
		</BrowserRouter>
	)
}

export default App

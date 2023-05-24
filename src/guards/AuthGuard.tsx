import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from 'src/redux'

export default function AuthGuard() {

	const employee = useAppSelector(state => state.employee)

	if (employee.token) {
		return <Outlet />
	}

	return <Navigate to="/login" />
}
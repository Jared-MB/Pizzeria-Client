import { Route, Routes } from 'react-router-dom'
import { ChildrenProps } from 'src/models'

/**
 * A component that wraps the routes and adds a not found route to the end of the routes
 *
 * @param {ChildrenProps} props - The props for the component, expects another routes
 * @returns {React.ReactElement} The routes with a not found route
 */
export default function RoutesWithNotFound({
	children,
}: ChildrenProps): React.ReactElement {
	return (
		<Routes>
			{children}
			<Route path="*" element={<>Not Found</>} />
		</Routes>
	)
}

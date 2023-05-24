import { Link } from 'react-router-dom'
import { IoReturnUpBack } from 'react-icons/io5'

export default function Back() {
	return (
		<Link to='..'>
			<IoReturnUpBack className='text-purple-700 w-8 h-8' title='Atrás' />
		</Link>
	)
}
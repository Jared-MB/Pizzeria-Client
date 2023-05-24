import { Link } from 'react-router-dom'
import { useAppSelector } from 'src/redux'
import { Back } from '../components'

export default function Clients() {

	const clients = useAppSelector(state => state.clients)

	return (
		<>
			<header className='flex justify-between items-center p-4'>
				<h2 className='text-xl text-purple-700'>Clientes</h2>
				<div className='flex items-center gap-8'>
					<Link to='add' className='bg-purple-700 text-white rounded px-4 py-2 hover:bg-purple-800'>Agregar Cliente</Link>
					<Back />
				</div>
			</header>
			<div className='px-4 flex flex-col gap-4'>
				<ul className='grid grid-cols-3 text-purple-700 font-medium text-lg'>
					<li>
						Nombre
					</li>
					<li>
						Dirección
					</li>
					<li>
						Teléfono
					</li>
				</ul>
				<ul className='flex flex-col gap-2'>
					{
						clients.map(client => (
							<li key={client._id}>
								<ul className='grid grid-cols-3 hover:bg-zinc-300 p-2 rounded duration-200'>
									<li>
										{client.name}
									</li>
									<li>
										{client.address}
									</li>
									<li>
										{client.phone}
									</li>
								</ul>
							</li>
						))
					}
				</ul>
			</div>
		</>
	)
}
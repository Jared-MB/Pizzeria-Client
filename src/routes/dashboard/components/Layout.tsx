import { NavLink, Outlet } from 'react-router-dom'
import { Routes } from 'src/models'

export default function Layout() {
	return (
		<main>
			<header className='flex justify-between items-center p-2'>
				<h1 className='text-purple-700 text-2xl'>
					<NavLink to='/' replace>
						Pizzeria - Panel de administración
					</NavLink>
				</h1>
				<nav>
					<ul className='flex gap-4'>
						<li className='text-zinc-500'>
							<NavLink to={Routes.ROOT} className='hover:text-purple-700 duration-300'>
								Inicio
							</NavLink>
						</li>
						<li className='text-zinc-500'>
							<NavLink to={Routes.ADD_ORDER} className='hover:text-purple-700 duration-300'>
								Agregar pedido
							</NavLink>
						</li>
						<li className='text-zinc-500'>
							<NavLink to={Routes.CLIENTS} className='hover:text-purple-700 duration-300'>
								Clientes
							</NavLink>
						</li>
						<li className='text-zinc-500'>
							<NavLink to={Routes.PRODUCTS} className='hover:text-purple-700 duration-300'>
								Productos
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<hr className='bg-purple-700 h-[2px]' />
			<section>
				<Outlet />
			</section>
		</main>
	)
}
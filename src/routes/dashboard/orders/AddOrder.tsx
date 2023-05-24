import { TOrder, TProductWithQuantity } from 'src/models'
import { Back } from '../components'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Server } from 'src/services'
import { useAppDispatch, useAppSelector } from 'src/redux'
import { useNavigate } from 'react-router-dom'
import { addOrder } from 'src/redux/slices/orderSlice'
import { BiSearch } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { reduceStock } from 'src/redux/slices/productSlice'

export default function AddOrder() {

	const dispatch = useAppDispatch()
	const clients = useAppSelector(state => state.clients)
	const products = useAppSelector(state => state.products)
	const navigate = useNavigate()

	const [shoppingCart, setShoppingCart] = useState<TProductWithQuantity[]>([])
	const [values, setValues] = useState<Omit<TOrder, '_id' | 'products'>>({
		client: '',
		paymentMethod: 'cash',
		status: 'pending',
		type: 'delivery',
	})

	const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (values.client === '') return toast.error('Todos los campos son obligatorios')
		try {
			const order = {
				...values,
				products: shoppingCart
			}
			const response = await new Server().post<Omit<TOrder, '_id'>, TOrder>('/orders', order)
			if (response.status === 201) {
				dispatch(addOrder(response.order as TOrder))
				dispatch(reduceStock(shoppingCart))
				toast.success('Orden agregada')
				navigate('..')
			}
		}
		catch {
			toast.error('Ocurrió un error')
		}
	}

	const [showClients, setShowClients] = useState(false)

	const onClickClientButton = () => {
		setShowClients(!showClients)
	}

	const onClickClient = (id: string) => {
		setValues({
			...values,
			client: id
		})
		setShowClients(false)
	}

	const findClient = (id: string) => {
		const client = clients.find(client => client._id === id)
		if (client) return client.name
		return ''
	}


	const addShoppingCart = (id: string) => {
		const product = products.find(product => product._id === id)
		if (product) {
			if (product.stock === 0) return toast.error('No hay más stock')
			const productInCart = shoppingCart.find(product => product._id === id)
			if (productInCart) {
				if (productInCart.quantity === productInCart.stock) return toast.error('No hay más stock')
				setShoppingCart(shoppingCart.map(product => product._id === id ? { ...product, quantity: product.quantity + 1 } : product))
			}
			else {
				setShoppingCart([...shoppingCart, { ...product, quantity: 1 }])
			}
		}
	}

	const removeShoppingCart = (id: string) => {
		const product = shoppingCart.find(product => product._id === id)
		if (product) {
			if (product.quantity === 1) {
				setShoppingCart(shoppingCart.filter(product => product._id !== id))
			}
			else {
				setShoppingCart(shoppingCart.map(product => product._id === id ? { ...product, quantity: product.quantity - 1 } : product))
			}
		}
	}

	const calculateTotal = () => {
		let total = 0
		shoppingCart.forEach(product => {
			total += product.price * product.quantity
		})
		return total
	}

	return (
		<form className='p-4 flex flex-col gap-10' onSubmit={onSubmit}>
			<header className='flex justify-between items-center'>
				<h2 className='text-xl text-purple-700'>
					Agregar Orden
				</h2>
				<Back />
			</header>
			<div className='grid grid-cols-3 px-8 gap-8'>
				<div>
					<label htmlFor='type' className='block text-purple-700 font-medium'>Productos</label>
					<ul>
						{
							products.map(product => (
								<li key={product._id} onClick={() => addShoppingCart(product._id as string)} className='grid grid-cols-[1fr_15%] gap-4 hover:bg-zinc-300 rounded px-2 py-1 cursor-pointer'>
									<span>
										{product.name}
									</span>
									<span>
										${product.price}
									</span>
								</li>
							))
						}
					</ul>
				</div>
				<div className='border border-purple-700 rounded p-2'>
					<label htmlFor='type' className='block text-purple-700 font-medium'>Carrito</label>
					<ul className='overflow-y-scroll h-[50vh] overflow-x-hidden'>
						{
							shoppingCart.map(product => (
								<li key={product._id} className='grid grid-cols-[1fr_10%_10%_10%] gap-4 px-1'>
									<span>
										{product.name}
									</span>
									<span>
										{product.quantity}
									</span>
									<span>
										${product.price * product.quantity}
									</span>
									<span onClick={() => removeShoppingCart(product._id as string)}>
										<IoMdClose className='w-6 h-6 text-purple-700 cursor-pointer' />
									</span>
								</li>
							))
						}
					</ul>
					<span>Total: ${calculateTotal()}</span>
				</div>
				<div className='flex flex-col gap-3 w-fit'>
					<div>
						<label htmlFor='client' className='block text-purple-700 font-medium'>Cliente</label>
						<div className='flex items-center gap-2 border border-purple-700 rounded'>
							<input type='text' readOnly value={findClient(values.client)} className='w-full rounded px-4 py-2 outline-none' />
							<button type='button' onClick={onClickClientButton}>
								{
									showClients ?
										<IoMdClose className='w-8 h-8 text-purple-700' />
										:
										<BiSearch className='w-8 h-8 text-purple-700' />
								}
							</button>
						</div>
					</div>
					{
						showClients &&
						<ul className='h-32 overflow-y-scroll'>
							{
								clients.map(client => (
									<li key={client._id} onClick={() => onClickClient(client._id)} className='hover:bg-zinc-300 p-2 rounded duration-200 cursor-pointer'>
										{client.name}
									</li>
								))
							}
						</ul>
					}
					<div>
						<label htmlFor='paymentMethod' className='block text-purple-700 font-medium'>Método de pago</label>
						<select name='paymentMethod' id='paymentMethod' value={values.paymentMethod} onChange={onChangeSelect} className='w-full border border-purple-700 rounded px-4 py-2 outline-none'>
							<option value='cash'>Efectivo</option>
							<option value='card'>Tarjeta</option>
						</select>
					</div>
					<div>
						<label htmlFor='status' className='block text-purple-700 font-medium'>Estado</label>
						<select name='status' id='status' value={values.status} onChange={onChangeSelect} className='border border-purple-700 w-full rounded px-4 py-2 outline-none'>
							<option value='pending'>Pendiente</option>
							<option value='finished'>Finalizado</option>
						</select>
					</div>
					<div>
						<label htmlFor='type' className='block text-purple-700 font-medium'>Tipo</label>
						<select name='type' id='type' value={values.type} onChange={onChangeSelect} className='w-full border border-purple-700 rounded px-4 py-2 outline-none'>
							<option value='delivery'>Delivery</option>
							<option value='pickup'>Recoger</option>
							<option value='inStore'>En tienda</option>
						</select>
					</div>
					<input type='submit' value='Agregar' className='bg-purple-700 text-white rounded px-4 py-2 hover:bg-purple-800 cursor-pointer' />
				</div>
			</div>
		</form>
	)
}
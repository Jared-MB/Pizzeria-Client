import { useState } from 'react'
import { Back } from '..'
import { TProduct } from 'src/models'
import { toast } from 'react-hot-toast'
import { Server } from 'src/services'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/redux'
import { addProduct } from 'src/redux/slices/productSlice'

export default function AddProduct() {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [values, setValues] = useState<Omit<TProduct, '_id'>>({
		name: '',
		price: 0,
		stock: 0,
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (values.name === '' || values.price === 0 || values.stock === 0) return toast.error('Todos los campos son obligatorios')
		try {
			const response = await new Server().post<Omit<TProduct, '_id'>, TProduct>('/products', values)
			if (response.status === 201) {
				dispatch(addProduct(response.product as TProduct))
				toast.success('Producto agregado')
				navigate('..')
			}
		}
		catch {
			toast.error('Error al agregar el producto')
		}
	}

	return (
		<form className='p-4 flex flex-col gap-10' onSubmit={onSubmit}>
			<header className='flex justify-between items-center'>
				<h2 className='text-xl text-purple-700'>
					Agregar Producto
				</h2>
				<Back />
			</header>
			<div className='flex justify-center'>
				<div className='flex flex-col gap-3 w-fit'>
					<div>
						<label htmlFor='name' className='block text-purple-700 font-medium'>Nombre</label>
						<input
							type='text'
							name='name'
							id='name'
							className='w-full border border-purple-700 rounded px-4 py-2'
							value={values.name}
							onChange={onChange}
						/>
					</div>
					<div>
						<label htmlFor='price' className='block text-purple-700 font-medium'>Precio</label>
						<input
							type='number'
							name='price'
							id='price'
							className='w-full border border-purple-700 rounded px-4 py-2'
							value={values.price}
							onChange={onChange}
						/>
					</div>
					<div>
						<label htmlFor='stock' className='block text-purple-700 font-medium'>Stock</label>
						<input
							type='number'
							name='stock'
							id='stock'
							className='w-full border border-purple-700 rounded px-4 py-2'
							value={values.stock}
							onChange={onChange}
						/>
					</div>
					<input type='submit' value='Agregar' className='bg-purple-700 text-white rounded px-4 py-2 hover:bg-purple-800 cursor-pointer' />
				</div>
			</div>
		</form>
	)
}
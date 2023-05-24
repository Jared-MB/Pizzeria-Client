import { TClient } from 'src/models'
import { Back } from '../components'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Server } from 'src/services'
import { useAppDispatch } from 'src/redux'
import { addClient } from 'src/redux/slices/clientSlice'
import { useNavigate } from 'react-router-dom'

export default function AddClient() {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [values, setValues] = useState<Omit<TClient, '_id'>>({
		name: '',
		phone: '' as unknown as number,
		address: '',
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (values.name === '' || values.phone.toString().length <= 0 || values.address === '') return toast.error('Todos los campos son obligatorios')
		try {
			const response = await new Server().post<Omit<TClient, '_id'>, TClient>('/clients', values)
			if (response.status === 201) {
				dispatch(addClient(response.client as TClient))
				toast.success('Cliente agregado')
				navigate('..')
			}
		}
		catch {
			toast.error('Ocurrió un error')
		}
	}

	return (
		<form className='p-4 flex flex-col gap-10' onSubmit={onSubmit}>
			<header className='flex justify-between items-center'>
				<h2 className='text-xl text-purple-700'>
					Agregar Cliente
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
						<label htmlFor='phone' className='block text-purple-700 font-medium'>Teléfono</label>
						<input
							type='number'
							name='phone'
							id='phone'
							className='w-full border border-purple-700 rounded px-4 py-2'
							value={values.phone}
							onChange={onChange}
						/>
					</div>
					<div>
						<label htmlFor='address' className='block text-purple-700 font-medium'>Dirección</label>
						<input
							type='text'
							name='address'
							id='address'
							className='w-full border border-purple-700 rounded px-4 py-2'
							value={values.address}
							onChange={onChange}
						/>
					</div>
					<input type='submit' value='Agregar' className='bg-purple-700 text-white rounded px-4 py-2 hover:bg-purple-800 cursor-pointer' />
				</div>
			</div>
		</form>
	)
}
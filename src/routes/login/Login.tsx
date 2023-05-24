import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Routes, TEmployee, TLogin } from 'src/models'
import { useAppDispatch } from 'src/redux'
import { clearEmployee, setEmployee } from 'src/redux/slices/employeeSlice'
import { Server } from 'src/services'

export default function Login() {


	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [values, setValues] = useState<TLogin>({
		username: '',
		password: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (values.username === '' || values.password === '') return toast.error('Todos los campos son obligatorios')
		try {
			const response = await new Server().post<TLogin, TEmployee>('/auth/login', values)
			if (response.user && response.status === 200) {
				dispatch(setEmployee(response.user as TEmployee))
				toast.success('Bienvenido')
				navigate(`/${Routes.DASHBOARD}`, { replace: true })
			}
		}
		catch {
			toast.error('Usuario o contraseña incorrectos')
		}
	}

	useEffect(() => {
		dispatch(clearEmployee())
	}, [])

	return (
		<main className='flex justify-center items-center h-screen'>
			<section className='flex flex-col gap-8'>
				<h1 className='text-3xl text-purple-700'>Login Pizzeria</h1>
				<div className='flex justify-center items-center'>
					<form onSubmit={handleSubmit} className='flex flex-col gap-3 w-fit'>
						<div>
							<label htmlFor="username" className='block text-purple-700 font-medium'>Usuario</label>
							<input type="text" name="username" id="username" onChange={handleChange} value={values.username} className='w-full border border-purple-700 rounded px-4 py-2' />
						</div>
						<div>
							<label htmlFor="password" className='block text-purple-700 font-medium'>Contraseña</label>
							<input type="password" name="password" id="password" onChange={handleChange} value={values.password} className='w-full border border-purple-700 rounded px-4 py-2' />
						</div>
						<input type='submit' value='Entrar' className='bg-purple-700 text-white rounded px-4 py-2 hover:bg-purple-800 cursor-pointer' />
					</form>
				</div>
			</section>
		</main>
	)
}
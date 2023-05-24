export enum Role {
	ADMIN = 'admin',
	EMPLOYEE = 'employee'
}

export interface TEmployee {
	name: string
	username: string
	role: Role
	phone: number
	token: string
}

export const EmptyEmployee: TEmployee = {
	name: '',
	username: '',
	role: Role.EMPLOYEE,
	phone: 0,
	token: ''
}

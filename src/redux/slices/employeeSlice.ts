import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { EmptyEmployee, LocalStorageKeys, TEmployee } from 'src/models'
import { removeLocalStorage, setLocalStorage } from 'src/utilities'

export const employeeSlice = createSlice({
	name: 'employee',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: EmptyEmployee,
	reducers: {
		setEmployee: (_state, action: PayloadAction<TEmployee>) => {
			setLocalStorage(LocalStorageKeys.EMPLOYEE, action.payload)
			return action.payload
		},
		clearEmployee: () => {
			removeLocalStorage(LocalStorageKeys.EMPLOYEE)
			return EmptyEmployee
		}
	},
})

export const { clearEmployee, setEmployee } = employeeSlice.actions

export default employeeSlice.reducer
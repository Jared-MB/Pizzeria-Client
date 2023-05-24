import { configureStore } from '@reduxjs/toolkit'
import { clientSlice, employeeSlice, orderSlice, productSlice } from './slices'

export const store = configureStore({
	reducer: {
		employee: employeeSlice,
		orders: orderSlice,
		clients: clientSlice,
		products: productSlice
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
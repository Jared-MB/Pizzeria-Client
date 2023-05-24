import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TOrder } from 'src/models'
import { Server } from 'src/services'
import { RootState } from '..'

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
	const response = await new Server().get<TOrder[]>('/orders')
	return response.orders
}, {
	condition: (_id, { getState }) => {
		if ((getState() as RootState).orders.length > 0) {
			return false
		}
		return true
	}
})

export const orderSlice = createSlice({
	name: 'order',
	initialState: [] as TOrder[],
	reducers: {
		setOrders(_state, action: PayloadAction<TOrder[]>) {
			return action.payload
		},
		addOrder(state, action: PayloadAction<TOrder>) {
			const order = action.payload
			return [...state, order]
		},
		removeOrder(state, action: PayloadAction<string>) {
			const id = action.payload
			return state.filter(order => order._id !== id)
		},
		clearOrders() {
			return [] as TOrder[]
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchOrders.fulfilled, (_state, action) => {
			return action.payload as TOrder[]
		})
		builder.addCase(fetchOrders.rejected, (_state, action) => {
			console.log(action.error.message)
		})

	}
})

export const { addOrder, clearOrders, removeOrder, setOrders } = orderSlice.actions

export default orderSlice.reducer
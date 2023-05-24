import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EmptyClient, TClient } from 'src/models'
import { Server } from 'src/services'

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
	const response = await new Server().get<TClient[]>('/clients')
	return response.clients
}, {
	condition: (id, { getState }) => {
		if ((getState() as TClient[]).length > 0) {
			return false
		}
		return true
	}
})

export const clientSlice = createSlice({
	name: 'clients',
	initialState: [] as TClient[],
	reducers: {
		setClients(_state, action: PayloadAction<TClient[]>) {
			return action.payload
		},
		addClient(state, action: PayloadAction<TClient>) {
			const client = action.payload
			return [...state, client]
		},
		removeClient(state, action: PayloadAction<string>) {
			const id = action.payload
			return state.filter(client => client._id !== id)
		},
		clearClients() {
			return [] as TClient[]
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchClients.fulfilled, (_state, action) => {
			return action.payload as TClient[]
		})
		builder.addCase(fetchClients.rejected, (_state, action) => {
			console.log(action.error.message)
		})

	}
})

export const { addClient, clearClients, removeClient, setClients } = clientSlice.actions

export default clientSlice.reducer
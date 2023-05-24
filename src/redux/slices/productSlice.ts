import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TProduct, TProductWithQuantity } from 'src/models'
import { Server } from 'src/services'
import { RootState } from '..'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const response = await new Server().get<TProduct[]>('/products')
	return response.products
}, {
	condition: (_id, { getState }) => {
		if ((getState() as RootState).products.length > 0) {
			return false
		}
		return true
	}
})

export const productSlice = createSlice({
	name: 'products',
	initialState: [] as TProduct[],
	reducers: {
		setProducts(_state, action: PayloadAction<TProduct[]>) {
			return action.payload
		},
		addProduct(state, action: PayloadAction<TProduct>) {
			const product = action.payload
			return [...state, product]
		},
		removeProduct(state, action: PayloadAction<string>) {
			const id = action.payload
			return state.filter(product => product._id !== id)
		},
		clearProducts() {
			return [] as TProduct[]
		},
		reduceStock(state, action: PayloadAction<TProductWithQuantity[]>) {
			const products = action.payload
			return state.map(product => {
				const productWithQuantity = products.find(productWithQuantity => productWithQuantity._id === product._id)
				if (productWithQuantity) {
					return { ...product, stock: product.stock - productWithQuantity.quantity }
				}
				return product
			})
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchProducts.fulfilled, (_state, action) => {
			return action.payload as TProduct[]
		})
		builder.addCase(fetchProducts.rejected, (_state, action) => {
			console.log(action.error.message)
		})

	}
})

export const { addProduct, clearProducts, removeProduct, setProducts, reduceStock } = productSlice.actions

export default productSlice.reducer
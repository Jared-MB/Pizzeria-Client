import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './redux'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<Toaster />
		</Provider>
	</React.StrictMode>,
)

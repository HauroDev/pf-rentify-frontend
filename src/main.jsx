import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { ToastProvider } from './context/ToastContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<ToastProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ToastProvider>
	</Provider>
)

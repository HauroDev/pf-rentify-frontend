import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/products/productsSlice'
import searchReducer from './features/search/searchSlice'
import userReducer from './features/user/userSlice'
import categoriesReducer from './features/categories/categoriesSlice'
import countriesReducer from './features/countries/countriesSlice'

export const store = configureStore({
	reducer: {
		products: productsReducer,
		search: searchReducer,
		user: userReducer,
		categories: categoriesReducer,
		countries: countriesReducer,
	},
})

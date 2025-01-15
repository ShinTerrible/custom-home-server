import { rootReducer } from './root-reducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	// devTools: process.env.NODE_ENV !== 'production',
})

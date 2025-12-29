import { rootReducer } from './root-reducer'
import { configureStore } from '@reduxjs/toolkit'
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux'
import { enableMapSet } from 'immer'

//поддержка Map и Set в Immer
enableMapSet()

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['searchData/setFilmDisabled'],
				ignoredPaths: ['searchData.disabledFilms'],
			},
		}),
	// devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = () => dispatchHook()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store

import { combineReducers } from 'redux'
import { searchData } from '../components/slices/searchData'

export const rootReducer = combineReducers({
	[searchData.name]: searchData.reducer,
})

import { combineReducers } from 'redux'
import { searchData } from '../../src/slices/search-data/searchData'
import { filmData } from '../slices/film-data/filmData'
import { popupState } from '../slices/popup/popup'

export const rootReducer = combineReducers({
	[searchData.name]: searchData.reducer,
	[popupState.name]: popupState.reducer,
	[filmData.name]: filmData.reducer,
})

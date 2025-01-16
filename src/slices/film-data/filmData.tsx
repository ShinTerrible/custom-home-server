import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDownloadApi, getFilmViewApi, IFilmViewUI } from '../../utils/api'

type IFilmView = {
	title: string
	body: string
	image_bs64: string
}

const initialState: IFilmView = {
	title: '',
	body: '',
	image_bs64: '',
}

export const getFilmView = createAsyncThunk('film/getFilm', getFilmViewApi)

export const onDownloadData = createAsyncThunk(
	'download/onDownload',
	getDownloadApi
)

export const filmData = createSlice({
	name: 'filmData',
	initialState,
	reducers: {
		resetFilmData: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getFilmView.fulfilled, (state, { payload }) => {
			state = { ...payload }
		})
		
	},
	selectors: {
		getFilmViewState: (state) => state,
	},
})
export const { getFilmViewState } = filmData.selectors
export const { resetFilmData } = filmData.actions
export default filmData.reducer

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDownloadApi, getFilmViewApi, IFilmViewUI } from '../../utils/api'

type IFilmView = {
	isLoading: boolean
	title: string
	body: string
	image_bs64: string
	id: string
}

const initialState: IFilmView = {
	isLoading: false,
	title: '',
	body: '',
	image_bs64: '',
	id: '',
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
		setFilmIdData: (state, { payload }: PayloadAction<string>) => {
			state.id = payload
		},
		resetFilmData: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getFilmView.pending, (state) => {
			state.isLoading = true
		}),
			builder.addCase(getFilmView.fulfilled, (state, { payload }) => {
				state.body = payload.body
				state.image_bs64 = payload.image_bs64
				state.title = payload.title
				state.id = ''
				state.isLoading = false
			})
	},
	selectors: {
		getFilmViewState: (state) => state,
	},
})
export const getFilmViewState = filmData.selectors
export const { setFilmIdData, resetFilmData } = filmData.actions
export default filmData.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	getSearchApi,
	getSearchIdDataApi,
	IFilmData,
	ISearchData,
} from '../../utils/api'
import { PayloadAction } from '@reduxjs/toolkit'

interface SerializedError {
	name?: string | undefined
	message?: string | undefined
	stack?: string | undefined
	code?: string | undefined
}

type Error = {
	error: SerializedError | undefined | string
}
export const initialState: ISearchData & Error = {
	rows: undefined,
	page: 0,
	total_pages: 0,
	total_founded_rows: 0,
	search_id: '',
	error: undefined,
}

//Thunks
export const getSearchData = createAsyncThunk(
	'searchData/getSearchData',
	getSearchApi
)

export const getSearchIdData = createAsyncThunk(
	'searchIdData/getSearchIdData',
	getSearchIdDataApi
)

export const searchData = createSlice({
	name: 'searchData',
	initialState,
	reducers: {
		updateSearchData: (state, { payload }: PayloadAction<IFilmData[]>) => {
			state.rows = payload
		},
		resetSearchData: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSearchData.fulfilled, (state, { payload }) => {
				state.rows = payload?.rows
				state.page = payload?.page
				state.search_id = payload?.search_id
				state.total_founded_rows = payload?.total_founded_rows
				state.total_pages = payload?.total_pages
				state.error = undefined
			})
			.addCase(getSearchData.rejected, (state, { error }) => {
				state.error = error.message
			}),
			builder
				.addCase(getSearchIdData.fulfilled, (state, { payload }) => {
					state = { ...payload, error: undefined }
				})
				.addCase(getSearchIdData.rejected, (state, { error }) => {
					state.error = error.message
				})
	},
	selectors: {
		getSearchDataState: (state) => state,
		getFilms: (state) => state.rows as [],
		getTotalPages: (state) => state.total_pages,
		getTotalPagesRows: (state) => state.total_founded_rows,
		getSearchID: (state) => state.search_id,
	},
})

export const {
	getSearchDataState,
	getFilms,
	getTotalPages,
	getTotalPagesRows,
	getSearchID,
} = searchData.selectors
export const { updateSearchData, resetSearchData } = searchData.actions
export default searchData.reducer

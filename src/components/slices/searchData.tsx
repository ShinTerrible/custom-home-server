import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSearchApi, ISearchData } from '../../utils/api'
import { PayloadAction } from '@reduxjs/toolkit'

interface SerializedError {
	name?: string
	message?: string
	stack?: string
	code?: string
}

type Error = {
	error: SerializedError | undefined | string
}
export const initialState: ISearchData & Error = {
	rows: [
		{
			forum: '',
			label: '',
			author: '',
			size: '',
			size_bytes: 0,
			sids: 0,
			leeches: 0,
			downloaded_times: 0,
			created: '',
			content_id: '',
		},
	],
	page: 0,
	total_pages: 0,
	total_founded_rows: 0,
	search_id: '',
	error: undefined,
}

//Thunks
export const getData = createAsyncThunk(
	'searchData/getSearchData',
	getSearchApi
)

export const searchData = createSlice({
	name: 'searchData',
	initialState,
	reducers: {
		updateSearchData: (
			state,
			{ payload }: PayloadAction<ISearchData & Error>
		) => {
			state = payload
		},
		resetSearchData: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getData.rejected, (state, { error }) => {
			state.error = error.message
		})
	},
	selectors: {
		getState: (state) => state,
		getFilms: (state) => state.rows,
	},
})

export const { getState, getFilms } = searchData.selectors
export const { updateSearchData, resetSearchData } = searchData.actions
export default searchData.reducer

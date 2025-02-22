import { createSlice } from '@reduxjs/toolkit'

type TPopupState = {
	popupVisible: boolean
}

const initialState: TPopupState = {
	popupVisible: false,
}

export const popupState = createSlice({
	name: 'popupState',
	initialState,
	reducers: {
		changeVisibility: (state, { payload }) => {
			state.popupVisible = payload
		},
	},
	selectors: {
		getPopupState: (state) => state.popupVisible,
	},
})

export const { getPopupState } = popupState.selectors
export const { changeVisibility } = popupState.actions
export default popupState.reducer

import { IFilmViewUI } from "../../utils/api"


filmDataView: { title: '', body: '', image_bs64: '', id: '' },



export const updateFilmDetails = (data: any) => {
	store.setState((state) => {
		return {
			...state,
			filmDataView: data,
		}
	})
}

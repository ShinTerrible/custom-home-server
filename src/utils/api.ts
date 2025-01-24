export const URL = process.env.TORRENT_API_URL

const checkResponse = <T>(res: Response): Promise<T> =>
	res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

// // TYPES
export type IFilmData = {
	forum: string
	label: string
	author: string
	size: string
	size_bytes: number
	sids: number
	leeches: number
	downloaded_times: number
	created: string
	content_id: string
}

export type ISearchData = {
	rows: IFilmData[] | undefined
	page: number | undefined
	total_pages: number | undefined
	total_founded_rows: number | undefined
	search_id: string | undefined
}

export type IFilmView = {
	title: string
	body: string
	image_bs64: string
}

export type IFilmViewUI = {
	title: string
	body: string
	image_bs64: string
	id: string
}

// //PROMISES
// // // serch data
export const getSearchApi = (query: string) => {
	return fetch(`${URL}/v1/search?query=${query}`)
		.then((res) => checkResponse<ISearchData>(res))
		.then((data) => {
			if (data) return data
		})
}

// // // search id data
export const getSearchIdDataApi = (payload: { id: string; page: number }) => {
	const { id, page } = payload
	return fetch(`${URL}/v1/search/${id}/${page}`)
		.then((res) => checkResponse<ISearchData>(res))
		.then((data) => {
			return data
		})
}

// // //download
export const getDownloadApi = (id: string) => {
	return fetch(`${URL}/v1/download/${id}`)
		.then((res) => checkResponse<ISearchData>(res))
		.then((data) => {
			return data
		})
}

// // //view
export const getFilmViewApi = (id: string) => {
	return fetch(`${URL}/v1/view/${id}`)
		.then((res) => checkResponse<IFilmView>(res))
		.then((data) => {
			if (data) return data

			return Promise.reject(data)
		})
}

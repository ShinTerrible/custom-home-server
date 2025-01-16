import { FC } from 'react'
import { FilmDetailsUI } from '../UI/film-details/film-details-ui'
import { useSelector } from '../../services/store'
import { getFilmViewState } from '../../slices/film-data/filmData'
import { useDispatch } from '../../services/store'
import { useParams } from 'react-router-dom'
import {
	getFilms,
	getSearchDataState,
} from '../../slices/search-data/searchData'
import { getDownloadApi, IFilmData } from '../../utils/api'

type Params = {
	id: string
}

export const FilmDetails: FC = () => {
	/* Готовим данные для отображения */
	const { id } = useParams<Params>()

	const { title, body, image_bs64 } = useSelector(getFilmViewState)
	const dispatch = useDispatch()

	const filmID = useSelector((state) => state.searchData?.rows)

	const onDownload = async () => {
		const _id = filmID?.find((item: IFilmData) => {
			item.content_id === id
		})

		// TODO: fix download button
		await getDownloadApi(_id)
	}

	return (
		<FilmDetailsUI
			title={title}
			body={body}
			image_bs64={image_bs64}
			onDownload={onDownload}
		/>
	)
}

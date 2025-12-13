import { FC } from 'react'
import { FilmDetailsUI } from '../UI/film-details/film-details-ui'
import { useSelector } from '../../services/store'
import { onDownloadData } from '../../slices/film-data/filmData'
import { useDispatch } from '../../services/store'
import { Params, useParams } from 'react-router-dom'

import { changeVisibility } from '../../slices/popup/popup'


export const FilmDetails: FC = () => {
	const { _id } = useParams<Params>()

	const films = useSelector((state) => state.filmData)

	const dispatch = useDispatch()

	const onDownload = () => {
		dispatch(onDownloadData(films.id))
		const showPopup = () => dispatch(changeVisibility(true))
		const hidePopup = () => dispatch(changeVisibility(false))

		showPopup()
		return setTimeout(hidePopup, 4000)
	}

	return (
		<FilmDetailsUI
			title={films.title}
			body={films.body}
			image_bs64={films.image_bs64}
			onDownload={onDownload}
			isLoading={films.isLoading}
		/>
	)
}

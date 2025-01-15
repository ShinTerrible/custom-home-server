import { FC } from 'react'
import { FilmDetailsUI } from './film-details-ui'
import { useStore } from '@tanstack/react-store'
import { store } from '../../services/store'

export const FilmDetails: FC = () => {
	/* Готовим данные для отображения */
	const { title, body, image_bs64, id } = useStore(
		store,
		(state) => state.filmDataView
	)

	return (
		<FilmDetailsUI title={title} body={body} image_bs64={image_bs64} id={id} />
	)
}

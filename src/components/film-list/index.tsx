import { FilmListItemUI } from '../UI/film-list-element'
import { IFilmData } from '../../utils/api'
import { memo, SyntheticEvent, useMemo } from 'react'

export const FilmList = memo(
	({
		films,
		onFilmDetails,
		onDownload,
		disabledFilms,
	}: {
		films: IFilmData[]
		onFilmDetails: (id: string) => void
		onDownload: (e: SyntheticEvent, id: string) => void
		disabledFilms: Map<string, boolean>
	}) => {
		const list = useMemo(() => {
			return films?.map((element) => {
				return (
					<FilmListItemUI
						key={element.content_id}
						forum={element.forum}
						label={element.label}
						size={element.size}
						sids={element.sids}
						id={element.content_id}
						onFilmDetails={onFilmDetails}
						onDownload={onDownload}
						disabledFilms={
							disabledFilms.has(element.content_id)
								? (disabledFilms.get(element.content_id) as boolean)
								: false
						}
					/>
				)
			})
		}, [films, onFilmDetails, onDownload, disabledFilms])

		return <>{list}</>
	}
)

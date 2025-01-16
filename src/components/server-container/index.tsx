import { SearchModule } from '../search-module/search'
import { FilmListContainer } from '../film-list-container'
import style from './style.module.scss'
import { FC } from 'react'
import { Popup } from '../popup/popup'

export const ServerContainer: FC = () => {
	return (
		<div className={style.container}>
			<SearchModule />
			<FilmListContainer />
			<Popup />
		</div>
	)
}

import { FilmListItemUI } from '../UI/film-list-element'
import style from './styles.module.scss'
import { IFilmData } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
import { ContentContainer } from '../container/container'
import { SortUI } from '../filter'
import { PaginationUI } from '../pagination/paginationUI'
import { useDispatch, useSelector } from '../../services/store'
import {
	getFilms,
	getTotalPages,
	getSearchID,
	getSearchIdData,
	getPage,
} from '../../slices/search-data/searchData'
import {
	getFilmView,
	onDownloadData,
	setFilmIdData,
} from '../../slices/film-data/filmData'
import { changeVisibility } from '../../slices/popup/popup'

export const FilmListContainer: FC = () => {
	const dispatch = useDispatch()
	let films: IFilmData[] | undefined = useSelector(getFilms)
	let page: number | undefined = useSelector(getPage)
	let totalPages: number | undefined = useSelector(getTotalPages)
	totalPages = totalPages as number

	let searchID: string | undefined = useSelector(getSearchID)
	const navigate = useNavigate()

	const noData = <span className={style.noData}>Пока ничего не найдено.</span>

	const onUpdatePage = async (pageQuery: number) => {
		dispatch(getSearchIdData({ id: searchID as string, page: pageQuery }))
		return
	}

	const onFilmDetails = (id: string) => {
		dispatch(getFilmView(id))
		dispatch(setFilmIdData(id))
		navigate(`/${id}`)
	}

	const onDownload = (id: string) => {
		dispatch(onDownloadData(id))
		const showPopup = () => dispatch(changeVisibility(true))
		const hidePopup = () => dispatch(changeVisibility(false))

		showPopup()
		return setTimeout(hidePopup, 3000)
	}

	const filmListRender = () => {
		const pagination = (
			<PaginationUI
				page={page as number}
				total={totalPages}
				onUpdatePage={onUpdatePage}
			/>
		)

		const list = films?.map((element, index) => {
			return (
				<FilmListItemUI
					key={index}
					forum={element.forum}
					label={element.label}
					size={element.size}
					sids={element.sids}
					id={element.content_id}
					onFilmDetails={onFilmDetails}
					onDownload={onDownload}
				/>
			)
		})

		return [list, pagination]
	}

	return (
		<>
			<SortUI />
			<ContentContainer>
				{films !== undefined ? filmListRender() : noData}
			</ContentContainer>
		</>
	)
}

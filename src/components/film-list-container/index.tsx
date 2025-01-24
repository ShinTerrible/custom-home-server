import { FilmListItemUI } from '../UI/film-list-element'
import style from './styles.module.scss'
import { useStore } from '@tanstack/react-store'
import {
	getFilmViewApi,
	ISearchData,
	getDownloadApi,
	IFilmData,
	getSearchIdDataApi,
} from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'
import { ContentContainer } from '../container/container'
import { SortUI } from '../filter'
import { PaginationUI } from '../pagination/paginationUI'
import { useDispatch, useSelector } from '../../services/store'
import {
	getFilms,
	getTotalPages,
	getSearchID,
	getSearchIdData,
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
	let totalPages: number | undefined = useSelector(getTotalPages)
	let searchID: string | undefined = useSelector(getSearchID)
	const navigate = useNavigate()

	const [page, setPage] = useState<number>(totalPages as number)

	const [displayPrev, setDisplayPrev] = useState(false)
	const [displayNext, setDisplayNext] = useState(true)

	const noData = <span className={style.noData}>Пока ничего не найдено.</span>
	let statePage: number | string = page

	const onUpdatePage = async (page: number) => {
		setPage(page)
		dispatch(getSearchIdData({ id: searchID as string, page: page }))

		return
	}

	// TODO: fix dispatch functions
	// const onFilmDetails = async (id: string) => {
	// 	try {
	// 		let data = await getFilmViewApi(id)
	// 		let toUIData = { ...data, id }
	// 		return updateFilmDetails(toUIData)
	// 	} catch (err) {
	// 		console.log(err)
	// 	} finally {
	// 		navigate(`/${id}`)
	// 	}
	// 	return
	// }
		// const onDownload = async (id: string) => {
	// 	await getDownloadApi(id)
	// 	const showPopup = () =>
	// 		store.setState((state) => {
	// 			return { ...state, popupState: true }
	// 		})

	// 	const hidePopup = () =>
	// 		store.setState((state) => {
	// 			return { ...state, popupState: false }
	// 		})

	// 	showPopup()
	// 	return setTimeout(hidePopup, 4000)
	// }

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
		return setTimeout(hidePopup, 4000)
	}

	const filmListRender = () => {
		const pagination = (
			<PaginationUI
				statePage={statePage}
				displayPrev={displayPrev}
				displayNext={displayNext}
				page={page}
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

		// if (page === 1) {
		// 	statePage = 'x_x'
		// 	setDisplayPrev(true)
		// } else if (page > 1) {
		// 	setDisplayPrev(false)
		// }

		// if (page === totalPages) {
		// 	statePage = 'x_x'
		// 	setDisplayNext(true)
		// } else if (page < totalPages) {
		// 	setDisplayNext(false)
		// }

		// return [list, pagination]
		return list
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

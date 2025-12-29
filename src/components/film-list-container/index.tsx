import style from './styles.module.scss'
import { IFilmData } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { FC, SyntheticEvent, useCallback, useEffect, useMemo } from 'react'
import { ContentContainer } from '../container/container'
import { Sort } from '../sort'
import { PaginationUI } from '../pagination/paginationUI'
import { useDispatch, useSelector } from '../../services/store'
import {
	getFilms,
	getTotalPages,
	getSearchID,
	getSearchIdData,
	getPage,
	getDisabledFilms,
} from '../../slices/search-data/searchData'
import {
	getFilmView,
	onDownloadData,
	setFilmIdData,
} from '../../slices/film-data/filmData'

import { changeVisibility } from '../../slices/popup/popup'
import { Preloader } from '../preloader/preloader'
import { FilmList } from '../film-list'

export const FilmListContainer: FC = () => {
	const dispatch = useDispatch()
	let films: IFilmData[] | undefined = useSelector(getFilms)
	let page: number | undefined = useSelector(getPage)
	let totalPages: number | undefined = useSelector(getTotalPages)
	let disabledFilms = useSelector(getDisabledFilms)
	const isLoading = useSelector((state) => state.searchData.isLoading)
	totalPages = totalPages as number

	let searchID: string | undefined = useSelector(getSearchID)
	const navigate = useNavigate()

	const noData = <span className={style.noData}>Пока ничего не найдено.</span>

	const onUpdatePage = async (pageQuery: number) => {
		dispatch(getSearchIdData({ id: searchID as string, page: pageQuery }))
		return
	}

	const onFilmDetails = useCallback(
		(id: string) => {
			dispatch(getFilmView(id))
			dispatch(setFilmIdData(id))
			navigate(`/${id}`)
		},
		[navigate]
	)

	const onDownload = useCallback(
		(e: SyntheticEvent, id: string) => {
			dispatch(onDownloadData(id))
			e.preventDefault()
			e.stopPropagation()
			const showPopup = () => dispatch(changeVisibility(true))
			const hidePopup = () => dispatch(changeVisibility(false))

			showPopup()
			return setTimeout(hidePopup, 3000)
		},
		[navigate]
	)

	const filmListRender = useMemo(() => {
		const searchResultInfo = (
			<div className={style.filmResultContainer}>
				<span className={style.filmResultHeader}>Результаты поиска:</span>
				<Sort />
			</div>
		)

		const pagination = (
			<PaginationUI
				page={page as number}
				total={totalPages}
				onUpdatePage={onUpdatePage}
			/>
		)
		const listWrapper = (
			<div className={style.sizeM}>
				<FilmList
					films={films}
					onFilmDetails={onFilmDetails}
					onDownload={onDownload}
					disabledFilms={disabledFilms}
				/>
			</div>
		)

		return [searchResultInfo, listWrapper, pagination]
	}, [films, page, totalPages, navigate, disabledFilms])

	if (isLoading) {
		return <Preloader />
	}

	return (
		<>
			<ContentContainer>
				{films !== undefined ? filmListRender : noData}
			</ContentContainer>
		</>
	)
}

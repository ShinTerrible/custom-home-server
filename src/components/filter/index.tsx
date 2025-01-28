import { ButtonUI } from '../button/button'
import filterSVG from '../../assets/images/sort-01.svg'
import style from './styles.module.scss'
import { ContentContainer } from '../container/container'
import { useState } from 'react'
import { useDispatch, useSelector } from '../../services/store'
import { IFilmData } from '../../utils/api'
import { getFilms, updateSearchData } from '../../slices/search-data/searchData'
import clsx from 'clsx'

enum OrderBy {
	sids = 'sids',
	size = 'size_bytes',
}

export const SortUI = () => {
	const dispatch = useDispatch()
	const [isShown, setVisibility] = useState<boolean>(false)
	let arr = useSelector(getFilms)

	const onSort = (condition: OrderBy) => {
		let fieldName = condition as keyof IFilmData

		const compare = (a: IFilmData, b: IFilmData) => {
			let aConverted = a[fieldName]
			let bConverted = b[fieldName]

			if (aConverted < bConverted) return 1
			if (aConverted > bConverted) return -1
			return 0
		}

		dispatch(updateSearchData(arr.toSorted(compare)))

		return
	}

	const sortComponents = () => {
		return (
			<div className={style.dropdown}>
				<div className={style.dropdownCover}>
					{' '}
					<ButtonUI
						title={'по сидам'}
						onClick={() => {
							onSort(OrderBy.sids)
						}}
						styleProps={style.sideButton}
					></ButtonUI>
					<ButtonUI
						title={'по размерам'}
						onClick={() => {
							onSort(OrderBy.size)
						}}
						styleProps={style.sizeButton}
					></ButtonUI>
				</div>
			</div>
		)
	}

	return (
		<ContentContainer styleProps={style.container}>
			<ButtonUI
				title={''}
				onClick={() => {
					setVisibility((state) => !state)
				}}
				styleProps={style.sortButton}
			>
				<img
					src={filterSVG}
					alt='изображение сортировки'
					className={style.icon}
				/>
			</ButtonUI>
			{isShown ? sortComponents() : null}
		</ContentContainer>
	)
}

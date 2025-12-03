import { ButtonUI } from '../button/button'
import { ContentContainer } from '../container/container'
import { useState } from 'react'
import { useDispatch, useSelector } from '../../services/store'
import { IFilmData } from '../../utils/api'
import { getFilms, updateSearchData } from '../../slices/search-data/searchData'
import { SortUI } from '../UI/sort/sort'
import style from './styles.module.scss'

enum OrderBy {
	sids = 'sids',
	size = 'size_bytes',
}

export const Sort = () => {
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

	return (
		<ContentContainer styleProps={style.sortContainer}>
			<ButtonUI
				title={''}
				onClick={() => {
					setVisibility((state) => !state)
				}}
				styleProps={style.sortButton}
				svgProps={style.sortIcon}
			></ButtonUI>
			{isShown ? <SortUI onSort={onSort} /> : null}
		</ContentContainer>
	)
}

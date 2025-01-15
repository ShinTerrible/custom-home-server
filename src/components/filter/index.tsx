import { ButtonUI } from '../button/button'
import filterSVG from '../../assets/images/sort-01.svg'
import style from './styles.module.scss'
import { ContentContainer } from '../container/container'
import { useState } from 'react'
import { store } from '../../services/store'
import { useStore } from '@tanstack/react-store'
import { IFilmData } from '../../utils/api'
import { updateSearchData } from '../../services/store'

enum OrderBy {
	sids = 'sids',
	size = 'size',
}

export const SortUI = () => {
	const [isShown, setVisibility] = useState<boolean>(false)
	let arr: IFilmData[] = useStore(store, (state) => state.searchData)

	const onSort = (condition: OrderBy) => {

		let fieldName = condition as keyof IFilmData
		const compare = (a: IFilmData, b: IFilmData) => {
			if (Number(a[fieldName]) < Number(b[fieldName])) {
				return -1
			}
			if (Number(a[fieldName]) > Number(b[fieldName])) {
				return 1
			}
			return 0
		}

		arr.sort(compare)
		updateSearchData(arr)

		return
	}

	const sortComponents = () => {
		return (
			<div className={style.dropdown}>
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

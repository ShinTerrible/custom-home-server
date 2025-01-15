import { FC, memo } from 'react'
import style from './styles.module.scss'
import { ButtonUI } from '../button/button'

type PaginationProps = {
	statePage: number | string
	displayPrev: boolean
	displayNext: boolean
	page: number
	onUpdatePage: (page: number) => Promise<void>
}

export const PaginationUI: FC<PaginationProps> = ({
	statePage,
	displayPrev,
	page,
	displayNext,
	onUpdatePage,
}) => {
	return (
		<div className={style.paginationContainer}>
			{' '}
			<ButtonUI
				id='prev_page-button'
				title={`${statePage}`}
				onClick={() => onUpdatePage((statePage as number) - 1)}
				styleProps={''}
				display={displayPrev}
			></ButtonUI>
			<span className={style.paginationState}>{page}</span>
			<ButtonUI
				id='next_page-button'
				title={`${typeof statePage === 'number' ? statePage + 1 : statePage}`}
				onClick={() => onUpdatePage((statePage as number) + 1)}
				styleProps={''}
				display={displayNext}
			></ButtonUI>
		</div>
	)
}

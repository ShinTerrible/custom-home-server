import { FC, useMemo } from 'react'
import style from './styles.module.scss'
import { ButtonUI } from '../button/button'

type PaginationProps = {
	page: number
	total: number
	onUpdatePage: (page: number) => Promise<void>
	disabled?: boolean
	showPageNumbers?: boolean
	maxVisiblePages?: number
}

export const PaginationUI: FC<PaginationProps> = ({
	page,
	total,
	onUpdatePage,
	disabled = false,
	showPageNumbers = false,
	maxVisiblePages = 5,
}) => {
	const PREVIOUS_LABEL = '← '
	const NEXT_LABEL = ' →'

	const hasPrevious = page > 1
	const hasNext = page < total

	const previousPage = page - 1
	const nextPage = page + 1

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= total && !disabled && newPage !== page) {
			onUpdatePage(newPage)
		}
	}

	return (
		<div className={style.paginationContainer}>
			<ButtonUI
				title={PREVIOUS_LABEL}
				onClick={() => handlePageChange(previousPage)}
				styleProps={`${style.paginationButtonProps} ${style.previousButton}`}
				disabled={!hasPrevious || disabled}
				aria-label={`Предыдущая страница (${previousPage})`}
			/>

			<span className={style.paginationState}>
				{page} из {total}
			</span>

			<ButtonUI
				title={NEXT_LABEL}
				onClick={() => handlePageChange(nextPage)}
				styleProps={`${style.paginationButtonProps} ${style.nextButton}`}
				disabled={!hasNext || disabled}
				aria-label={`Следующая страница (${nextPage})`}
			/>
		</div>
	)
}



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

	// Генерация видимых номеров страниц
	const visiblePages = useMemo(() => {
		if (!showPageNumbers || total <= 1) return []

		const pages = []
		const half = Math.floor(maxVisiblePages / 2)
		let start = Math.max(1, page - half)
		let end = Math.min(total, start + maxVisiblePages - 1)

		// Корректируем start если мы в конце
		if (end - start + 1 < maxVisiblePages) {
			start = Math.max(1, end - maxVisiblePages + 1)
		}

		for (let i = start; i <= end; i++) {
			pages.push(i)
		}

		return pages
	}, [page, total, showPageNumbers, maxVisiblePages])

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= total && !disabled && newPage !== page) {
			onUpdatePage(newPage)
		}
	}

	return (
		<div className={style.paginationContainer}>
			{/* Кнопка "Назад" */}
			<ButtonUI
				title={PREVIOUS_LABEL }
				onClick={() => handlePageChange(previousPage)}
				styleProps={`${style.paginationButtonProps} ${style.previousButton}`}
				disabled={!hasPrevious || disabled}
				aria-label={`Предыдущая страница (${previousPage})`}
			/>

			{/* Номера страниц */}
			{showPageNumbers &&
				visiblePages.map((pageNum) => (
					<ButtonUI
						key={pageNum}
						title={pageNum.toString()}
						onClick={() => handlePageChange(pageNum)}
						styleProps={`
            ${style.paginationButtonProps} 
            ${pageNum === page ? style.activePage : ''}
          `}
						disabled={disabled}
						aria-label={`Страница ${pageNum}`}
						aria-current={pageNum === page ? 'page' : undefined}
					/>
				))}

			{/* Информация о текущей странице */}
			{!showPageNumbers && (
				<span className={style.paginationState}>
					{page} из {total}
				</span>
			)}

			{/* Кнопка "Вперед" */}
			<ButtonUI
				title= {NEXT_LABEL}
				onClick={() => handlePageChange(nextPage)}
				styleProps={`${style.paginationButtonProps} ${style.nextButton}`}
				disabled={!hasNext || disabled}
				aria-label={`Следующая страница (${nextPage})`}
			/>
		</div>
	)
}

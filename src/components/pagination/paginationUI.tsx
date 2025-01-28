import { FC, memo } from 'react'
import style from './styles.module.scss'
import { ButtonUI } from '../button/button'

type PaginationProps = {
	page: number
	total: number
	onUpdatePage: (page: number) => Promise<void>
}

export const PaginationUI: FC<PaginationProps> = ({
	page,
	total,
	onUpdatePage,
}) => {
	let end = 'x_x'
	let prev: number = page - 1
	let next = page + 1

	return (
		<div className={style.paginationContainer}>
			{' '}
			<ButtonUI
				title={`${prev <= 0 ? end : '← ' + prev}`}
				// заглушка на запрос: если предыдущая стр равна 0, отправится текущая
				onClick={() => onUpdatePage((page as number) - 1 !== 0 ? prev : page)}
				styleProps={style.paginationButtonProps}
				display={prev <= 0}
			></ButtonUI>
			<span className={style.paginationState}>{page}</span>
			<ButtonUI
				title={`${next + 1 >= total ? end : next + ' →'}`}
				onClick={() =>
					onUpdatePage((page as number) + 1 <= total ? next : page)
				}
				styleProps={style.paginationButtonProps}
				display={(page as number) + 1 >= total}
			></ButtonUI>
		</div>
	)
}

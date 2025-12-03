import { ButtonUI } from '../../button/button'
import style from './styles.module.scss'
import { FC } from 'react'

enum OrderBy {
	sids = 'sids',
	size = 'size_bytes',
}

type SortUIProps = {
	onSort: (condition: OrderBy) => void
}

export const SortUI: FC<SortUIProps> = ({ onSort }) => {
	return (
		<div className={style.dropdown}>
			<div className={style.dropdownCover}>
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

import style from './styles.module.scss'
import { ButtonUI } from '../../button/button'
import { memo, SyntheticEvent } from 'react'

type FilmListProps = {
	forum: string
	label: string
	size: string
	sids: number
	id: string
	onFilmDetails: (e: SyntheticEvent, id: string) => any
	onDownload: (e: SyntheticEvent, id: string) => any
}

export const FilmListItemUI = memo(
	({
		forum,
		label,
		size,
		sids,
		id,
		onFilmDetails,
		onDownload,
	}: FilmListProps) => {
		return (
			<>
				<div className={style.filmListItem}>
					<div
						className={style.filmListPosition}
						onClick={(e) => {
							onFilmDetails(e, id)
						}}
					>
						<h3 id='label' className={style.label}>
							{label}
						</h3>

						<div className={style.labelContainer}>
							<div className={style.labelWrapper}>
								<span id='sids' className={style.sids}>
									{sids} сидов
								</span>
								<span className={style.pointers}> • </span>
								<span id='size' className={style.size}>
									{size}
								</span>
								<span id='forum' className={style.forum}>
									{forum}
								</span>
							</div>

							<div className={style.buttonContainer}>
								<ButtonUI
									title={''}
									onClick={(e: SyntheticEvent) => onDownload(e, id)}
									styleProps={style.downloadButton}
									svgProps={`${style.filmElementIcon} ${style.iconDownload}`}
								></ButtonUI>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
)

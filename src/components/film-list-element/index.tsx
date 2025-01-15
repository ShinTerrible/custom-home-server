import style from './styles.module.scss'
import { ButtonUI } from '../button/button'
import downloadSVG from '../../assets/images/dwnld1.svg'
import openSVG from '../../assets/images/open-01.svg'
import { memo, useMemo } from 'react'

type FilmListProps = {
	forum: string
	label: string
	size: string
	sids: number
	id: string
	onFilmDetails: (id: string) => any
	onDownload: (id: string) => any
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
				{/* content */}
				<div className={style.filmListItem}>
					<div className={style.filmListPosition}>
						<h3 id='label' className={style.label}>
							<b>Название: </b> {label}
						</h3>{' '}
						<span id='sids' className={style.sids}>
							<b>Сиды: </b>
							{sids}
						</span>
						<span id='size' className={style.size}>
							<b>Размер:</b> {size}
						</span>{' '}
						<span id='forum' className={style.forum}>
							<b>Форум:</b> {forum}
						</span>{' '}
					</div>
					<div className={style.buttonContainer}>
						<ButtonUI
							title={''}
							onClick={() => onFilmDetails(id)}
							styleProps={style.openButton}
						>
							<img
								src={openSVG}
								alt='изображение открытия файла'
								className={style.icon}
							/>
						</ButtonUI>

						<ButtonUI
							title={''}
							onClick={() => onDownload(id)}
							styleProps={
								!onclick ? style.downloadButton : style.downloadButtonClick
							}
						>
							<img
								src={downloadSVG}
								alt='изображение загрузки файла'
								className={style.icon}
							/>
						</ButtonUI>
					</div>
				</div>
			</>
		)
	}
)

import style from './styles.module.scss'
import { ButtonUI } from '../../button/button'
import downloadSVG from '../../../assets/images/dwnld1.svg'
import openSVG from '../../../assets/images/open-01.svg'
import { memo } from 'react'

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
							{label}
						</h3>{' '}
						<span id='sids' className={style.sids}>
							{sids}s
						</span>
						{/* TODO: вместо поинтеров вставить svg */}
						<span className={style.pointers}>•</span>
						<span id='size' className={style.size}>
							{size}
						</span>{' '}
						<span className={style.pointers}>•</span>
						<span id='forum' className={style.forum}>
							{forum}
						</span>{' '}
						<div className={style.buttonContainer}>
							<ButtonUI
								title={''}
								onClick={() => onFilmDetails(id)}
								styleProps={
									!onclick ? style.openButton : style.downloadButtonClick
								}
								svgProps={`${style.filmElementIcon} ${style.iconOpen}`}
							></ButtonUI>

							<ButtonUI
								title={''}
								onClick={() => onDownload(id)}
								styleProps={
									!onclick ? style.downloadButton : style.downloadButtonClick
								}
								svgProps={`${style.filmElementIcon} ${style.iconDownload}`}
							></ButtonUI>
						</div>
					</div>
				</div>
			</>
		)
	}
)

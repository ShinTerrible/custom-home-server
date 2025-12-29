import style from './styles.module.scss'
import { ButtonUI } from '../../button/button'
import { memo, SyntheticEvent, useCallback} from 'react'
import { useDispatch } from '../../../services/store'
import { setFilmDisabled } from '../../../slices/search-data/searchData'

type FilmListProps = {
	forum: string
	label: string
	size: string
	sids: number
	id: string
	onFilmDetails: (id: string) => any
	onDownload: (e: SyntheticEvent, id: string) => any
	disabledFilms: boolean
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
		disabledFilms,
	}: FilmListProps & { disabledFilms?: boolean }) => {
		const dispatch = useDispatch()

		const handleDisabled = useCallback(() => {
			dispatch(setFilmDisabled({ filmId: id, disabled: true }))
		}, [dispatch, id])

		const handleDownload = useCallback(
			(e: SyntheticEvent) => {
				onDownload(e, id)
				handleDisabled()
			},
			[id, onDownload, handleDisabled]
		)

		return (
			<>
				<div className={style.filmListItem}>
					<div
						className={style.filmListPosition}
						onClick={() => onFilmDetails(id)}
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
									title={'Скачать'}
									onClick={handleDownload}
									styleProps={style.downloadButton}
									svgProps={`${style.filmElementIcon} ${style.iconDownload}`}
									disabled={disabledFilms}
								></ButtonUI>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
)

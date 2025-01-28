import { memo } from 'react'
import { FC } from 'react'
import style from './style.module.scss'
import { ContentContainer } from '../../container/container'
import { ButtonUI } from '../../button/button'
import backSVG from '../../../assets/images/back-01.svg'
import downloadSVG from '../../../assets/images/dwnld1.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from '../../../services/store'
import { resetFilmData } from '../../../slices/film-data/filmData'
import { Preloader } from '../../preloader/preloader'
import { Popup } from '../../popup/popup'

type TFilmDataProps = {
	title: string
	body: string
	image_bs64: string
	onDownload: () => void
	isLoading: boolean
}

export const FilmDetailsUI: FC<TFilmDataProps> = memo(
	({ title, body, image_bs64, onDownload, isLoading }) => {
		const navigate = useNavigate()
		const dispatch = useDispatch()

		const onConvertBody = () => {
			let bodyData = body.split('\n').filter((element) => element !== '')

			return bodyData.map((data, index) => {
				let [bold, thin] = data.split(':')
				if (thin !== undefined && thin !== '') bold = bold + ':'
				return (
					<li className={style.listElement} key={index}>
						<span className={style.listElement}>
							<span className={style.bold}>{bold}</span>
							{thin}
						</span>
					</li>
				)
			})
		}

		if (isLoading) {
			return (
					<Preloader />
			)
		}

		return (
			<div className={style.filmContainer}>
				<ContentContainer>
					<div className={style.cover}>
						<div className={style.buttonContainer}>
							<ButtonUI
								title={''}
								onClick={() => {
									dispatch(resetFilmData())
									navigate('/')
								}}
								styleProps={style.backButton}
							>
								<img
									src={backSVG}
									alt='изображение стрелки назад'
									className={style.icon}
								/>
							</ButtonUI>
							<ButtonUI
								title={''}
								onClick={onDownload}
								styleProps={style.downloadButton}
							>
								<img
									src={downloadSVG}
									alt='изображение скачать'
									className={style.icon}
								/>
							</ButtonUI>
						</div>

						<div className={style.imageContainer}>
							<h3 className={style.title}>{title}</h3>
							<img
								className={style.image}
								alt={`Постер ${title}`}
								src={'data:image/jpeg;base64, ' + image_bs64}
							/>
						</div>
						<ul className={style.listContainer}>{onConvertBody()}</ul>
					</div>
					<Popup />
				</ContentContainer>
			</div>
		)
	}
)

import { memo } from 'react'
import { FC } from 'react'
import style from './style.module.scss'
import { ContentContainer } from '../../container/container'
import { ButtonUI } from '../../button/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from '../../../services/store'
import { resetFilmData } from '../../../slices/film-data/filmData'
import { Preloader } from '../../preloader/preloader'
import { Popup } from '../../popup/popup'
import imgNull from '../../../assets/images/aac495934ca85855fed25a60e8bb2d98.jpg'

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
			return <Preloader />
		}

		return (
			<div className={style.filmContainer}>
				<ContentContainer>
					<div className={style.cover}>
						<div className={style.buttonContainer}>
							<ButtonUI
								title={'Назад'}
								onClick={() => {
									dispatch(resetFilmData())
									navigate('/')
								}}
								styleProps={style.backButton}
								svgProps={`${style.icon} ${style.iconBack}`}
							></ButtonUI>
						</div>

						<div className={style.imageContainer}>
							<img
								className={image_bs64 === null
										? style.imageF : style.image}
								alt={`Poster ${title}`}
								src={
									image_bs64 === null
										? imgNull
										: 'data:image/jpeg;base64, ' + image_bs64
								}
							/>

							<h3 className={style.title}>{title}</h3>
						</div>
						<div>
							<ButtonUI
								title={'Скачать'}
								onClick={onDownload}
								styleProps={style.downloadButton}
								svgProps={`${style.icon} ${style.iconDownload}`}
							></ButtonUI>
						</div>

						<ul className={style.listContainer}>{onConvertBody()}</ul>
					</div>
					<Popup />
				</ContentContainer>
			</div>
		)
	}
)

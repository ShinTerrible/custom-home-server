import { memo } from 'react'
import { FC } from 'react'
import { getDownloadApi, IFilmViewUI } from '../../utils/api'
import style from './style.module.scss'
import { ContentContainer } from '../container/container'

import { ButtonUI } from '../button/button'
import backSVG from '../../assets/images/back-01.svg'
import downloadSVG from '../../assets/images/dwnld1.svg'
import { useNavigate } from 'react-router-dom'

export const FilmDetailsUI: FC<IFilmViewUI> = memo(
	({ title, body, image_bs64, id }) => {
		const navigate = useNavigate()
		const onConvertBody = () => {
			let bodyData = body.split('\n').filter((element) => element !== '')

			return bodyData.map((data, index) => {
				let [bold, thin] = data.split(':')
				console.log(thin)
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

		const onDownload = async () => {
			return await getDownloadApi(id)
		}

		return (
			<div className={style.filmContainer}>
				<ContentContainer>
					<div className={style.cover}>
						<div className={style.buttonContainer}>
							<ButtonUI
								title={''}
								onClick={() => {
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
								onClick={() => onDownload}
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
				</ContentContainer>
			</div>
		)
	}
)

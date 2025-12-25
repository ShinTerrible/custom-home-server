// import React from 'react'
// import style from './styles.module.scss'
// import infoSVG from '../../assets/images/info.png'
// import { useSelector } from '../../services/store'

// import { getPopupState } from '../../slices/popup/popup'

// export const Popup = (): React.ReactElement => {
// 	const state = useSelector(getPopupState)

// 	return (
// 		<div className={`${style.popup} ${state === true ? '' : style.isClosing}`}>
// 			<img src={infoSVG} className={style.popupIcon}></img>
// 			<span className={style.popupInfo}>Торрент скачивается</span>
// 		</div>
// 	)
// }

import React, { useEffect, useState } from 'react'
import style from './styles.module.scss'
import infoSVG from '../../assets/images/info.png'
import { useSelector } from '../../services/store'

import { getPopupState } from '../../slices/popup/popup'

export const Popup = (): React.ReactElement => {
	const state = useSelector(getPopupState)
	const [isVisible, setIsVisible] = useState(false)
	const [isClosing, setIsClosing] = useState(false)

	useEffect(() => {
		if (state === true) {
			setIsClosing(false)
			setIsVisible(true)
		} else if (state === false && isVisible) {
			setIsClosing(true)

			const timer = setTimeout(() => {
				setIsVisible(false)
				setIsClosing(false)
			}, 550)

			return () => clearTimeout(timer)
		}
	}, [state, isVisible])

	// Если попап полностью скрыт, не рендерим его
	if (!isVisible && state === false) {
		return <div></div>
	}

	return (
		<div className={`${style.popup} ${isClosing ? style.isClosing : ''}`}>
			<img src={infoSVG} className={style.popupIcon} alt='info' />
			<span className={style.popupInfo}>Торрент скачивается</span>
		</div>
	)
}

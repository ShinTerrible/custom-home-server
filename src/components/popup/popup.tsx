import React from 'react'
import style from './styles.module.scss'
import infoSVG from '../../assets/images/info-01.svg'
import { useSelector } from '../../services/store'

import { getPopupState } from '../../slices/popup/popup'

export const Popup = (): React.ReactElement => {
	const state = useSelector(getPopupState)

	return (
		<div className={`${style.popup} ${state === true ? '' : style.isClosed}`}>
			<img src={infoSVG} className={style.popupIcon}></img>
			<span className={style.popupInfo}>Торрент скачивается</span>
		</div>
	)
}

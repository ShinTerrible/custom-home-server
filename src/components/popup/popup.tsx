import React, { useState } from 'react'
import style from './styles.module.scss'
import infoSVG from '../../assets/images/info-01.svg'
import { store } from '../../services/store'
import { useStore } from '@tanstack/react-store'

export const Popup = (): React.ReactElement => {
	let states = useStore(store, (state) => state.popupState)

	return (
		<div className={`${style.popup} ${states === true ? '' : style.isClosed}`}>
			<img src={infoSVG} className={style.popupIcon}></img>
			<span className={style.popupInfo}>Торрент скачивается</span>
		</div>
	)
}

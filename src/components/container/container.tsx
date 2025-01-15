import clsx from 'clsx'
import style from './styles.module.scss'
import { FC } from 'react'

type ContentElement = {
	children: any
	styleProps?: string
}

export const ContentContainer: FC<ContentElement> = ({
	children,
	styleProps,
}: ContentElement) => {
	return (
		<div className={clsx(style.transparentBackground, styleProps)}>
			{children}
		</div>
	)
}

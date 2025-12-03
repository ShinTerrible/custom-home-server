import clsx from 'clsx'
import { IButtonProps } from './types'
import style from './styles.module.scss'

export const ButtonUI = ({
	title,
	onClick,
	styleProps,
	disabled,
	svgProps,
	...otherProps
}: IButtonProps) => {
	return (
		<>
			<button
				type='submit'
				onClick={onClick}
				className={clsx(style.buttonContent, styleProps)}
				disabled={disabled}
				{...otherProps}
			>
				{title} <span className={clsx(svgProps)}></span>
			</button>
		</>
	)
}

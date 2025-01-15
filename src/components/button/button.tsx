import clsx from 'clsx'
import { IButtonProps } from './types'
import style from './styles.module.scss'

export const ButtonUI = ({
	id,
	title,
	onClick,
	styleProps,
	display,
	children,
}: IButtonProps) => {
	return (
		<>
			<button
				type='submit'
				onClick={onClick}
				className={clsx(style.buttonContent, styleProps)}
				disabled={display}
			>
				<span>{children}</span>
				{title}
			</button>
		</>
	)
}

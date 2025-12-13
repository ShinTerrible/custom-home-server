import React, { SyntheticEvent } from 'react'

export interface IButtonProps {
	title: String 
	onClick?: (e: SyntheticEvent) => void
	styleProps: string
	disabled?: boolean
	children?: React.ReactNode
	svgProps?: string
}

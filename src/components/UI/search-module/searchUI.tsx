import { FC, FormEvent, SetStateAction, Dispatch } from 'react'
import { ContentContainer } from '../../container/container'
import style from './styles.module.scss'
import { ButtonUI } from '../../button/button'

type SearchModuleUIProps = {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
	setValue: Dispatch<SetStateAction<string>>
	onKeyDown: (e: KeyboardEvent) => void
}

export const SearchModuleUI: FC<SearchModuleUIProps> = ({
	onSubmit,
	setValue,
	onKeyDown
}) => {
	return (
		<ContentContainer styleProps={style.filterContainer}>
			<form className={style.form} onSubmit={onSubmit}>
				<input
					id='search_name'
					className={style.searchName}
					type='text'
					placeholder='Поиск...'
					name='input'
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={e => onKeyDown} 
				/>
				<label htmlFor='input' className={style.searchImg}></label>
					<ButtonUI title='Искать' styleProps={style.searchButton}> </ButtonUI>
			</form>
		</ContentContainer>
	)
}

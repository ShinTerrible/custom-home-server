import { ButtonUI } from '../button/button'
import style from './styles.module.scss'
import React, { FC, useEffect, useState } from 'react'
import { getSearchApi } from '../../utils/api'
import { ContentContainer } from '../container/container'
import { updateSearchData } from '../../services/store'

export const SearchModuleUI: FC = () => {
	const [inputValue, setInputValue] = useState<string>('')

	const setValue = (value: string) => {
		setInputValue(value)
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			let data = await getSearchApi(inputValue)

			return updateSearchData(data.rows)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<ContentContainer>
			<form className={style.form} onSubmit={handleFormSubmit}>
				{' '}
				<input
					id='search_name'
					className={style.searchName}
					type='text'
					placeholder='Поиск...'
					name='input'
					onChange={(e) => setValue(e.target.value)}
				/>
				<label htmlFor='input' className={style.searchImg}>
					<ButtonUI
						title='Искать'
						onClick={() => {}}
						styleProps={style.searchButton}
					/>
				</label>
			</form>
		</ContentContainer>
	)
}

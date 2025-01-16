import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from '../../services/store'
import { SearchModuleUI } from '../UI/search-module/searchUI'
import { getSearchData } from '../../slices/search-data/searchData'

export const SearchModule: FC = () => {
	const [inputValue, setInputValue] = useState<string>('')
	const dispatch = useDispatch()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(getSearchData(inputValue))
	}

	return <SearchModuleUI onSubmit={handleSubmit} setValue={setInputValue} />
}

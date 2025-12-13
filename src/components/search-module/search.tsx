import { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from '../../services/store'
import { SearchModuleUI } from '../UI/search-module/searchUI'
import { getSearchData } from '../../slices/search-data/searchData'

export const SearchModule: FC = () => {
	const [inputValue, setInputValue] = useState<string>('')
	const dispatch = useDispatch()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(getSearchData(inputValue))
	}

	const handleSubmitKeyEnter = (e: KeyboardEvent) => {
		e.preventDefault()
		if (e.key === 'Enter' || e) {
			dispatch(getSearchData(inputValue))
		}
	}

	return <SearchModuleUI onSubmit={handleSubmit} setValue={setInputValue} onKeyDown={handleSubmitKeyEnter}/>
}

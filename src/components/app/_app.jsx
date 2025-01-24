import {} from 'react-redux'
import { ServerContainer } from '../server-container'
import '../../index.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { FilmDetails } from '../film-details/film-details'

export const App = () => {
	const location = useLocation()
	const background = location.state?.background

	return (
		<div className='app'>
			<Routes location={background || location}>
				<Route path='/' element={<ServerContainer />} />
				<Route path='/:id' element={<FilmDetails />} />
			</Routes>
		</div>
	)
}

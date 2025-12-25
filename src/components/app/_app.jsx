import {} from 'react-redux'
import { ServerContainer } from '../server-container'
import '../../index.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { FilmDetails } from '../film-details/film-details'
import { Footer } from '../UI/footer/footer'
import { Header } from '../UI/header/header'

export const App = () => {
	const location = useLocation()
	const background = location.state?.background

	return (
		<>
			<div className='app'>
				<Header />
				<Routes location={background || location}>
					<Route path='/' element={<ServerContainer />} />
					<Route path='/:id' element={<FilmDetails />} />
				</Routes>
				<Footer />
			</div>
		</>
	)
}

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MovieDetails from './pages/MovieDetails'
import './index.css'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/movie/:id' element={<MovieDetails />} />
			</Routes>
		</>
	)
}

export default App

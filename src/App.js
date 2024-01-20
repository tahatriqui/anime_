import AnimeItem from './Components/Anime'
import Gallery from './Components/Gallery'
import HomePage from './Components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/anime/:id' element={<AnimeItem/>}/>
      <Route path='/character/:id' element={<Gallery/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
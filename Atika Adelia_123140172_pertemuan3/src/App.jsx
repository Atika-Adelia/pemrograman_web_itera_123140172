import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/home' 
import StatsPage from './pages/stats' 
import BookFormPage from './pages/BookFormPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} /> 
        
        <Route path="stats" element={<StatsPage />} />

        <Route path="add" element={<BookFormPage />} />
        <Route path="edit/:id" element={<BookFormPage />} />
      </Route>
    </Routes>
  )
}

export default App
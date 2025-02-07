import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing';
import MakerCv from './pages/Makercv';
import Templates from './pages/Templates';
import Footer from './components/footer/footer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/editor" element={<MakerCv />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

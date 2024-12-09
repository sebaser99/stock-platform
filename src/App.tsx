
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import { MyStocks } from './pages/myStocks/MyStocks'
import { MyFunds } from './pages/myFunds/MyFunds'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/MyStocks" element={<MyStocks />} />
      <Route path="/MyFunds" element={<MyFunds />} />
    </Routes>
  )
}

export default App

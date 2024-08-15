import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import SingUp from './components/pages/SingUp'
import './styles/App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav/>
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/singup" element={<SingUp/>} />
        </Routes>
      </BrowserRouter>
    </main>
    <Footer/>
  </React.StrictMode>
)

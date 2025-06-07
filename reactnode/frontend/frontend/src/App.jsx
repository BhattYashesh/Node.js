import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login}></Route>
        <Route path='/register' Component={Register}></Route>
        <Route path='/dashboard' Component={Dashboard}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
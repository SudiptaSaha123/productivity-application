import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/signin'/>}></Route>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

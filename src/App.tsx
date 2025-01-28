
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ListUsers from './pages/ListUsers'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import NavBar from './components/NavBar'

function App() {


  return (
    <>

      <BrowserRouter>
        <NavBar/>
        <div className='container mx-auto mt-20'>
        <Routes>
          <Route path="#" element={<Home/>}></Route>
          <Route path="/ListUsers" element={<ListUsers/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          

        </Routes>

        </div>
        
      </BrowserRouter>
     
    </>
  )
}

export default App


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ListUsers from './pages/ListUsers'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import OfferList from './pages/OfferList'
import OfferForm from './pages/OfferForm'
import OfferDetail from './pages/OfferDetail'

function App() {


  return (
    <>

      <BrowserRouter>
        <NavBar/>
        <div className='container mx-auto mt-20'>
        <Routes>
          <Route path="#" element={<Home/>}></Route>
          <Route path="/listUsers" element={<ListUsers/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/offers" element={<OfferList/>}></Route>
          <Route path="/offers/New" element={<OfferForm/>}></Route>
          <Route path="/offers/edit/:id" element={<OfferForm/>}></Route>
          <Route path="/offers/:id" element={<OfferDetail/>}></Route>
          

        </Routes>

        </div>
        
      </BrowserRouter>
     
    </>
  )
}

export default App

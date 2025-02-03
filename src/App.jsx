import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
// import SigninPage from './Pages/SigninPage'
// import LoginPage from './Pages/LoginPage'
import Navbar from './Components/NavBar'
import './App.css'
import AuthService from './Services/AuthService'
import AuthContext from './Context/AuthContext'
import { useState } from 'react'
// import MiniJeux from './Pages/MiniJeux'
// import Horreur from './Pages/Horreur'
// import LegalPage from './Pages/LegalPage'
// import BookingPage from './Pages/BookingPage'
// import DetailsPage from './Pages/DetailsPage'
import ProfilePage from './Pages/ProfilePage'
import Footer from './Components/Footer'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isValid());
  const [username, setUsername] = useState(AuthService.getUsername());



  return <>
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path ='/ProfilePage' element={<ProfilePage />}></Route>
          {/* <Route path='/SigninPage' element={<SigninPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/legal' element={<LegalPage />}></Route>
        <Route path='/Booking' element={<BookingPage />}></Route>
        <Route path='/escapeGame/:id' element={<DetailsPage />}></Route>        
        <Route path='/jeux' element={<MiniJeux />}></Route>
        <Route path='/horreur' element={<Horreur />}></Route> */}

        </Routes>
        <Footer />
      </BrowserRouter>

    </AuthContext.Provider>

  </>

}

export default App;
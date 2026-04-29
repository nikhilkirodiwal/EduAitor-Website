import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Pages/Home';
import MarketplaceSection from './Pages/MarketplaceSection';
import SolutionPage from './Pages/SolutionPage';
import ScrollToTop from './Components/ScrollToTop';
import CursorCircle from './Components/CursorCircle';
import Plans from './Pages/Plans';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/footer/Footer';
import BookDemoPage from './Pages/BookDemoPage';


const App = () => {
  return (
   <>
   <CursorCircle />
   <ScrollToTop />
   <Navbar />
   <div className='main-content'>
   <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/solution'  element={<SolutionPage />}/>
        <Route path='/marketplace' element={<MarketplaceSection />} />
        {/* <Route path='/bookademo' element={<BookDemo />} /> */}
        <Route path='/plans' element={<Plans />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/bookademo' element={<BookDemoPage />} />

        
   </Routes>
   </div>
   <Footer />
   </>
  )
}

export default App

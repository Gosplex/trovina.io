import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import ContactUs from './pages/ContactUs'
import ServiceDetail from './pages/ServiceDetail'
import WhatsAppFloat from './components/WhatsAppFloat'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route
          path="*"
          element={
            <div className="text-center py-20 text-white text-4xl">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>

      <WhatsAppFloat />
    </>
  )
}

export default App

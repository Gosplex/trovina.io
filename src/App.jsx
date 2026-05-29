import { Routes, Route, useLocation, Link } from 'react-router-dom'


import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import Disclaimer from './pages/Disclaimer'
import Login from './pages/Login'
import ServiceDetail from './pages/ServiceDetail'
import WhatsAppFloat from './components/WhatsAppFloat'
import ScrollToTop from "./components/ScrollToTop";
import FreeWebistePromo from './ads/freeWebsiteOffer'
import AdminDashboard from "./pages/AdminDashboard";
import AdminLeads from "./pages/AdminLeads";
import LeadDetailView from "./pages/LeadDetailView";
import LeadEditView from "./pages/LeadEditView";
import AdminGuard from "./guards/AdminGuard";
import AdminProjects from "./pages/AdminProjects";
import AdminProjectCreate from "./pages/AdminProjectCreate";
import ProjectDetailView from "./pages/ProjectDetailView";
import AdminProjectEdit from "./pages/AdminProjectEdit";




import { Toaster } from 'react-hot-toast'


function App() {
  const location = useLocation()

  // 👇 Exclude WhatsApp float on landing page
  const hideWhatsApp =
    location.pathname === '/free-website-promo' ||
    location.pathname.includes('/admin');


  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid #333',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#000',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#000',
            },
          },
        }}
      />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/free-website-promo" element={<FreeWebistePromo />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        /// Admin pages
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />

        <Route
          path="/admin/leads"
          element={
            <AdminGuard>
              <AdminLeads />
            </AdminGuard>
          }
        />

        <Route
          path="/admin/leads/:id"
          element={
            <AdminGuard>
              <LeadDetailView />
            </AdminGuard>
          }
        />

        <Route
          path="/admin/leads/:id/edit"
          element={
            <AdminGuard>
              <LeadEditView />
            </AdminGuard>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <AdminGuard>
              <AdminProjects />
            </AdminGuard>
          }
        />

        <Route
          path="/admin/projects/new"
          element={
            <AdminGuard>
              <AdminProjectCreate />
            </AdminGuard>
          }
        />

        <Route
          path="/admin/projects/:id"
          element={
            <AdminGuard>
              <ProjectDetailView />
            </AdminGuard>
          }
        />

        <Route
          path="admin/projects/:id/edit"
          element={
            <AdminGuard>
              <AdminProjectEdit />
            </AdminGuard>
          }
        />



        <Route
          path="*"
          element={
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
              <p className="text-7xl font-bold text-gradient">404</p>
              <h1 className="text-2xl font-semibold text-foreground">Page Not Found</h1>
              <p className="max-w-md text-muted">
                The page you’re looking for doesn’t exist or has moved.
              </p>
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          }
        />
      </Routes>

      {!hideWhatsApp && <WhatsAppFloat />}
    </>
  )
}

export default App

import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// ============added====================
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

// Public pages
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Addproducts from './Components/Addproduct';
import Getproducts from './Components/Getproducts';
// import Test from './Components/Test';
import ForgotPassword from './Components/Forgotpassword';
import VerifyOTP from './Components/Verifyotp';
import Makepayments from './Components/Makepayments';
import Notfound from './Components/Notfound';
import Getproduct2 from './Components/Getproduct2';
import Dashnavbar from './Components/Dashnavbar';
import Profile from './Components/Profile';
import Cart from './Components/Cart';
import Checkout from "./Components/Checkout";
import Aboutus from './Components/Aboutus';

// Admin panel pages
// (Login dropped automatically since we now use the single global Signin component)
import Dashboard from './Components/Pages/Dashboard'
import Users from './Components/Pages/Users'
import Products from './Components/Pages/Products'
import Payments from './Components/Pages/Payments'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  // Helper security guard path gate
  const AdminSecurityGuard = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    // Separation of roles gate evaluation
    if (!token || role !== 'admin') {
      return <Navigate to="/signin" replace />;
    }

    // ── Admin panel layout (Sidebar + Navbar + dynamic content wrapper shell) ──
    return (
      <div className="d-flex bg-slate-900 min-vh-100" style={{ width: '100vw', overflowX: 'hidden' }}>
        <Sidebar
          isOpen={sidebarOpen}
          activePage={activePage}
          setActivePage={setActivePage}
          handleLogout={() => {
            localStorage.clear();
            window.location.href = '/signin';
          }}
        />

        <div
          className="flex-grow-1"
          style={{
            marginLeft: sidebarOpen ? '260px' : '0px',
            transition: 'margin-left 0.3s ease',
            minWidth: 0
          }}
        >
          <Navbar
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />

          <main className="position-relative" style={{ padding: '20px' }}>
            {/* The Outlet handles the actual admin components dynamically without leaking styles */}
            <Outlet />
          </main>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div className="App">

        {/* different routes binding the rendered documents */}
        <Routes>
          {/* ── PUBLIC ROUTES SECTION (No sidebar layout leak can hit these) ── */}
          <Route path='/'                element={
            <>
              {/* ── Public site header ── */}
              <header className="App-header">
                <h1 className='searchingltd'>
                  welcome to searching Limited Quality construction materials & tools. Buy new or resale.
                </h1>
              </header>
              <Getproducts />
            </>
          } />
          
          <Route path='/getproduct2'     element={<Getproduct2 />} />
          <Route path='/signup'          element={<Signup />} />
          <Route path='/signin'          element={<Signin />} />
          <Route path='/addproducts'     element={<Addproducts />} />
          <Route path='/forgotpassword'  element={<ForgotPassword />} />
          <Route path='/makepayments'    element={<Makepayments />} />
          <Route path='/verify-otp'      element={<VerifyOTP />} />
          {/* <Route path='/test'            element={<Test />} /> */}
          <Route path='/dashnavbar'      element={<Dashnavbar />} />
          <Route path='/profile'         element={<Profile />} />
          <Route path='/cart'            element={<Cart />} />
          <Route path='/checkout'        element={<Checkout />} />
          <Route path='/aboutus'         element={<Aboutus />} />

          {/* ── CLEANLY ISOLATED ADMIN CONTROL DASHBOARD PANELS ── */}
          <Route path='/admin' element={<AdminSecurityGuard />}>
            <Route index element={<Dashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='products' element={<Products />} />
            <Route path='payments' element={<Payments />} />
          </Route>

          {/* Catch-all fallback default */}
          <Route path='*'                element={<Notfound />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
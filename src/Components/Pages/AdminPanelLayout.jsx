import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // Your existing Sidebar component

export default function AdminPanelLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Track the current active path to sync your sidebar highlight state
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin/users') setActiveTab('users');
    else if (path === '/admin/products') setActiveTab('products');
    else if (path === '/admin/payments') setActiveTab('payments');
    else setActiveTab('dashboard');
  }, [location]);

  // Handle navigation changes cleanly across your sub-pages
  const handlePageChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'dashboard') navigate('/admin');
    else navigate(`/admin/${tabId}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: 99999,
      background: '#0f172a' 
    }}>
      {/* ── YOUR EXISTING MODULAR SIDEBAR ── */}
      <Sidebar 
        isOpen={true} 
        activePage={activeTab} 
        setActivePage={handlePageChange} 
        handleLogout={handleLogout} 
      />

      {/* ── ISOLATED VIEWPORT AREA ── */}
      <div style={{ 
        flex: 1, 
        height: '100%', 
        overflowY: 'auto', 
        background: '#f8fafc',
        boxSizing: 'border-box'
      }}>
        {/* Dynamic sub-views render here automatically without overlapping the store */}
        <Outlet />
      </div>
    </div>
  );
}
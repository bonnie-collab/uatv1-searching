import React from 'react';

export default function Sidebar({ isOpen, activePage, setActivePage, handleLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
    { id: 'users', label: 'Users Management', icon: 'bi-people-fill' },
    { id: 'products', label: 'Products Grid', icon: 'bi-box-seam-fill' },
    { id: 'payments', label: 'M-Pesa Payments', icon: 'bi-credit-card-fill' },
  ];

  return (
    <div className={`bg-slate-800 border-end border-slate-700 d-flex flex-column align-items-between vh-100 position-fixed start-0 top-0 transition-all`}
         style={{ width: isOpen ? '260px' : '0px', overflow: 'hidden', zIndex: 1030, transition: '0.3s' }}>
      
      <div className="p-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <i className="bi bi-lightning-charge-fill text-primary fs-3"></i>
          <span className="fs-4 fw-bold text-white tracking-tight">SearchLtd</span>
        </div>
        
        <ul className="nav nav-pills flex-column gap-2">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                onClick={() => setActivePage(item.id)}
                className={`nav-link w-100 text-start d-flex align-items-center gap-3 py-2 px-3 rounded-3 transition-all ${
                  activePage === item.id ? 'active bg-primary text-white' : 'text-slate-400 bg-transparent'
                }`}
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 mt-auto">
        <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 rounded-3">
          <i className="bi bi-box-arrow-left"></i>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
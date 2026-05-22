import React from 'react';

export default function Navbar({ toggleSidebar, sidebarOpen }) {
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Admin User', role: 'admin' };

  return (
    <nav className="navbar navbar-expand bg-slate-800 border-bottom border-slate-700 sticky-top px-4" style={{ height: '70px' }}>
      <button className="btn btn-link text-slate-400 p-0 me-3" onClick={toggleSidebar}>
        <i className={`bi ${sidebarOpen ? 'bi-text-paragraph' : 'bi-list'} fs-4`}></i>
      </button>

      <div className="d-none d-md-flex position-relative w-25">
        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-slate-400"></i>
        <input type="text" className="form-control bg-slate-900 border-slate-700 text-white ps-5 rounded-pill" placeholder="Search transactions, users..." />
      </div>

      <div className="ms-auto d-flex align-items-center gap-3">
        <button className="btn btn-link text-slate-400 position-relative p-1">
          <i className="bi bi-bell fs-5"></i>
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        </button>

        <div className="dropdown">
          <button className="btn btn-link d-flex align-items-center gap-2 text-decoration-none text-white dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center fw-bold text-white" style={{ width: '35px', height: '35px' }}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-start d-none d-sm-block">
              <div className="fw-semibold small">{user.username}</div>
              <div className="text-slate-400 xs-font" style={{ fontSize: '11px' }}>{user.role}</div>
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-end bg-slate-800 border-slate-700 shadow mt-2">
            <li><a className="dropdown-item text-white" href="#profile"><i className="bi bi-person me-2"></i>Profile</a></li>
            <li><a className="dropdown-item text-white" href="#settings"><i className="bi bi-gear me-2"></i>Settings</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
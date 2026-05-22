import React from 'react';

export default function KpiCard({ title, value, icon, trend, percentage }) {
  const isPositive = trend === 'up';
  return (
    <div className="card card-premium p-4">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <span className="text-slate-400 fw-medium small text-uppercase tracking-wider">{title}</span>
          <h3 className="text-white fw-bold mt-1 mb-0">{value}</h3>
        </div>
        <div className="bg-slate-900 p-2 rounded-3 border border-slate-700 text-primary">
          <i className={`bi ${icon} fs-4`}></i>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2 mt-3 small">
        <span className={`fw-semibold d-flex align-items-center gap-1 ${isPositive ? 'text-success' : 'text-danger'}`}>
          <i className={`bi ${isPositive ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}></i>
          {percentage}
        </span>
        <span className="text-slate-400">vs last month</span>
      </div>
    </div>
  );
}
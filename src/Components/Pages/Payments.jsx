import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/api';
import Skeleton from '../Skeleton';
import api from '../../apiHelper';

export default function Payments() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getPayments()
      .then(res => { setTransactions(res.data.response || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-20 px-2.5 py-1.5 rounded-3">Success</span>;
      case 'pending':
        return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-20 px-2.5 py-1.5 rounded-3">Pending</span>;
      default:
        return <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20 px-2.5 py-1.5 rounded-3">Failed</span>;
    }
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="text-white fw-bold mb-4">M-Pesa Clearing Gateway</h2>
      <div className="card card-premium p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle border-slate-700 mb-0">
            <thead>
              <tr className="text-slate-400 border-bottom border-slate-700">
                <th>Reference ID</th>
                <th>MSISDN Mobile Endpoint</th>
                <th>Settlement Principal</th>
                <th>Status Verification</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <Skeleton type="table" count={5} /> : transactions.map((tx, idx) => (
                <tr key={idx} className="border-bottom border-slate-700">
                  <td className="font-monospace text-white">{tx.MerchantRequestID || `TXN-${idx+1000}`}</td>
                  <td className="text-slate-400">{tx.PhoneNumber || '07XXXXXXXX'}</td>
                  <td className="fw-semibold text-white">KES {tx.Amount || '0.00'}</td>
                  <td>{getStatusBadge(tx.Status || 'Success')}</td>
                </tr>
              ))}
              {!loading && transactions.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-slate-400 py-5">No transaction payloads found in gateway memory pool.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
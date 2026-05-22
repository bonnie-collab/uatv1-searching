import React, { useState, useEffect } from 'react';
import api from '../../apiHelper'; // Import our new helper instance
import KpiCard from '../KpiCard';     // Your existing components
import Skeleton from '../Skeleton';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Request metrics from your Flask backend
        const response = await api.get('/admin/analytics');
        setMetrics(response.data);
      } catch (err) {
        console.error("Data tracking connection fault:", err);
        setError("Failed to fetch analytics metrics from the database.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container-fluid p-4 text-white">
      <h2 className="mb-4">System Overview Dashboard</h2>
      
      {/* Dynamic metric stats populated from your Flask API */}
      <div className="row g-3">
        <div className="col-md-3">
          <KpiCard title="Total Users" value={metrics?.kpis?.users || 0} icon="fa-users" color="bg-primary" />
        </div>
        <div className="col-md-3">
          <KpiCard title="Gross Sales" value={`KES ${metrics?.kpis?.sales || 0}`} icon="fa-shopping-cart" color="bg-success" />
        </div>
        <div className="col-md-3">
          <KpiCard title="Revenue Stream" value={`KES ${metrics?.kpis?.revenue || 0}`} icon="fa-wallet" color="bg-warning" />
        </div>
        <div className="col-md-3">
          <KpiCard title="System Performance" value={`${metrics?.kpis?.conversion || 100}%`} icon="fa-chart-line" color="bg-info" />
        </div>
      </div>
    </div>
  );
}
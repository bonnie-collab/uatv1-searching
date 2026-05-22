import React from 'react';

export default function Skeleton({ type = 'card', count = 1 }) {
  const renderSkeletonElement = (idx) => {
    if (type === 'table') {
      return (
        <tr key={idx} className="placeholder-glow">
          <td><span className="placeholder bg-secondary col-6 rounded"></span></td>
          <td><span className="placeholder bg-secondary col-8 rounded"></span></td>
          <td><span className="placeholder bg-secondary col-4 rounded"></span></td>
          <td><span className="placeholder bg-secondary col-3 rounded"></span></td>
        </tr>
      );
    }
    if (type === 'grid') {
      return (
        <div key={idx} className="col-md-4 col-sm-6 mb-4 placeholder-glow">
          <div className="card card-premium p-3">
            <div className="bg-slate-900 rounded-3 mb-3 placeholder w-100" style={{ height: '160px' }}></div>
            <span className="placeholder bg-secondary col-7 mb-2 rounded"></span>
            <span className="placeholder bg-secondary col-4 rounded"></span>
          </div>
        </div>
      );
    }
    return (
      <div key={idx} className="card card-premium p-4 mb-3 placeholder-glow">
        <span className="placeholder bg-secondary col-4 mb-3 rounded"></span>
        <h3 className="placeholder bg-secondary col-8 rounded"> </h3>
      </div>
    );
  };

  return <>{Array.from({ length: count }).map((_, i) => renderSkeletonElement(i))}</>;
}
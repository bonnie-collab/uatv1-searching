import React, { useState, useEffect } from 'react';
import api from '../../apiHelper';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get('/getproducts'); // Points directly to your product catalog route
        setProducts(response.data);
      } catch (err) {
        console.error("Failed parsing catalog listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  if (loading) return <div className="text-white p-4">Parsing machinery list...</div>;

  return (
    <div className="p-4 text-white">
      <h3 className="mb-3">Machinery Fleet Inventory Grid</h3>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {products.map((item) => (
          <div key={item.id} className="col">
            <div className="card bg-dark border-secondary h-100 text-white">
              <img src={item.image_url || '/images/excavator.jpg'} className="card-img-top" alt={item.name} style={{ height: '180px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title text-warning">{item.name}</h5>
                <p className="card-text text-muted mb-1">Category: {item.category}</p>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fw-bold text-success">KES {item.price}</span>
                  <span className="badge bg-secondary">{item.status || 'Available'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
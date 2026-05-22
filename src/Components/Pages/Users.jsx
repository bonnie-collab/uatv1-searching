import React, { useState, useEffect } from 'react';
import api from '../../apiHelper';

export default function Users() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDatabase = async () => {
    try {
      const response = await api.get('/admin/users');
      setAccounts(response.data);
    } catch (err) {
      console.error("Error reading backend user table data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDatabase();
  }, []);

  const handleToggleRole = async (userId, currentRole) => {
    const proposedRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change clearance status to ${proposedRole.toUpperCase()}?`)) return;

    try {
      await api.put(`/admin/users/${userId}/role`, { role: proposedRole });
      fetchUserDatabase(); // Refresh the grid data instantly
    } catch (err) {
      alert("Failed to modify user access privileges.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Permanently drop this user account? This cannot be undone.")) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUserDatabase(); // Refresh layout view state
    } catch (err) {
      alert("Error dropping transaction database profile logs.");
    }
  };

  if (loading) return <div className="text-white p-4">Loading system profile registers...</div>;

  return (
    <div className="p-4 text-white">
      <h3 className="mb-3">Registered Platform Accounts</h3>
      <div className="table-responsive bg-dark p-3 rounded">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>Role Permissions</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'bg-warning text-dark' : 'bg-info'}`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="text-end">
                  <button 
                    onClick={() => handleToggleRole(user.id, user.role)}
                    className="btn btn-sm btn-outline-light me-2"
                  >
                    <i className="fa fa-shield-alt"></i> Toggle Role
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
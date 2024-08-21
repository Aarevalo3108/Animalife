import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductManagement from '../components/ProductManagement';
import UserManagement from '../components/UserManagement';

function AdminPanel() {
    const [stats, setStats] = useState({ products: 0, users: 0 });
    
    useEffect(() => {
        // Fetch statistics
        axios.get('http://localhost:3001/stats')
        .then(response => setStats(response.data))
        .catch(error => console.error('Error fetching stats:', error));
    }, []);

    return (
        <div>
        <h1>Admin Panel</h1>
        
        <section>
            <h2>Statistics</h2>
            <p>Total Products: {stats.products}</p>
            <p>Total Users: {stats.users}</p>
        </section>
        
        <section>
            <h2>Product Management</h2>
            <ProductManagement />
        </section>
        
        <section>
            <h2>User Management</h2>
            <UserManagement />
        </section>
        </div>
    );
}

export default AdminPanel;

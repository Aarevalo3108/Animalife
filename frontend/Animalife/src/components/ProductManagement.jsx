// src/components/ProductManagement.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    api.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    api.delete(`/products/${id}`)
      .then(() => setProducts(products.filter(product => product._id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = () => {
    api.put(`/products/${editingProduct._id}`, editingProduct)
      .then(() => {
        setProducts(products.map(product => product._id === editingProduct._id ? editingProduct : product));
        setEditingProduct(null);
      })
      .catch(error => console.error('Error updating product:', error));
  };

  return (
    <div>
      <h3>Products List</h3>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;

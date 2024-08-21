import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los productos
    axios.get('http://localhost:3001/products') // Ajusta la URL a la de tu API
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Inicialmente, muestra todos los productos
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const handleSearch = (query) => {
    setFilteredProducts(
      products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleCategoryChange = (category) => {
    setFilteredProducts(
      category ? products.filter(product => product.category === category) : products
    );
  };

  return (
    <div className="flex flex-col overflow-x-hidden ">
        <Navbar />
        <div className='flex flex-row w-screen gap-6 h-screen  p-6  '>
            <Filters onCategoryChange={handleCategoryChange} />
                <div className="flex-1 p-6 flex flex-col  items-center w-full px-6   ">
                    <SearchBar className="w-96" onSearch={handleSearch} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                        <div id="products" className="flex flex-col h-full md:grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
                            {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Products;

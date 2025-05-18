import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import ProductCard from '../components/marketplace/ProductCard';
import ProductFilters, { FilterValues } from '../components/marketplace/ProductFilters';
import { getProducts } from '../services/productService';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';

const MOCK_CATEGORIES = ['Clothing', 'Jewelry', 'Home Decor', 'Art', 'Food', 'Crafts'];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Handwoven Cotton Scarf',
    description: 'Beautiful handwoven cotton scarf made with traditional techniques.',
    price: 350,
    image_url: 'https://th.bing.com/th/id/OIP.CkUlVOiHzSZmkYfGJVtVvgHaJ4?w=198&h=264&c=7&r=0&o=5&pid=1.7',
    seller_id: 'user1',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Embroidered Table Runner',
    description: 'Elegant table runner with intricate hand embroidery.',
    price: 500,
    image_url: 'https://th.bing.com/th/id/OIP.m5T4YZqadxBR1AR3rDvbHwAAAA?rs=1&pid=ImgDetMain',
    seller_id: 'user2',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Ceramic Planter',
    description: 'Handcrafted ceramic planter perfect for indoor plants.',
    price: 275,
    image_url: 'https://th.bing.com/th/id/OIP.reNilR_8DQqtNcn3KPv6OQHaHa?w=211&h=211&c=7&r=0&o=5&pid=1.7',
    seller_id: 'user3',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Silver Earrings',
    description: 'Traditional silver earrings with delicate filigree work.',
    price: 450,
    image_url: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/16087435a.webp',
    seller_id: 'user1',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Hand Painted Tote Bag',
    description: 'Eco-friendly canvas tote with beautiful hand-painted design.',
    price: 300,
    image_url: 'https://www.bing.com/th/id/OIP.yXdwgf60phZfJxwkfpzUyQHaLv?w=150&h=238&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
    seller_id: 'user2',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Natural Soap Set',
    description: 'Set of 3 handmade soaps using organic ingredients.',
    price: 200,
    image_url: 'https://th.bing.com/th/id/OIP.XM_7fPWCwBYtHbDBM0dVZgHaHa?w=192&h=191&c=7&r=0&o=5&pid=1.7',
    seller_id: 'user3',
    created_at: new Date().toISOString()
  }
];

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({
    category: '',
    minPrice: 0,
    maxPrice: 10000
  });
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // In a real app, this would call the API
        // const data = await getProducts(filters);
        
        // Mock data for now
        let filteredProducts = [...MOCK_PRODUCTS];
        
        if (filters.category) {
          filteredProducts = filteredProducts.filter(product => 
            product.name.includes(filters.category) || 
            product.description.includes(filters.category)
          );
        }
        
        filteredProducts = filteredProducts.filter(product => 
          product.price >= filters.minPrice && 
          product.price <= filters.maxPrice
        );
        
        setTimeout(() => {
          setProducts(filteredProducts);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-1/4 md:sticky md:top-20 mb-6 md:mb-0 md:mr-6">
          <ProductFilters 
            onFilterChange={handleFilterChange}
            categories={MOCK_CATEGORIES}
          />
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Marketplace</h1>
            
            {user && (
              <Link 
                to="/sell" 
                className="btn btn-primary flex items-center"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Sell Product
              </Link>
            )}
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="bg-danger-500 bg-opacity-10 text-danger-600 p-4 rounded-lg">
              {error}
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 mb-4">No products found matching your criteria.</p>
                  <button
                    onClick={() => setFilters({ category: '', minPrice: 0, maxPrice: 10000 })}
                    className="btn btn-secondary"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
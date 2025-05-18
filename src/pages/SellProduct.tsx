import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { addProduct } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';

const MOCK_CATEGORIES = ['Clothing', 'Jewelry', 'Home Decor', 'Art', 'Food', 'Crafts'];

const SellProduct: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // In a real app, this would upload to storage
    // For demo, we'll just create a local preview and use a placeholder URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      // In a real app, we'd get a URL from storage
      setFormData(prev => ({ 
        ...prev, 
        imageUrl: 'https://images.pexels.com/photos/6213041/pexels-photo-6213041.jpeg' 
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.price || !formData.description) {
      setError('Please fill all required fields');
      return;
    }
    
    if (!formData.imageUrl && !imagePreview) {
      setError('Please upload a product image');
      return;
    }
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the API
      // const productId = await addProduct({
      //   name: formData.name,
      //   description: formData.description,
      //   price: price,
      //   image_url: formData.imageUrl,
      //   seller_id: user?.uid || '',
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to marketplace on success
      navigate('/marketplace');
    } catch (err) {
      setError('Failed to add product. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <h1 className="text-2xl font-bold mb-6">Sell Your Product</h1>
      
      {error && (
        <div className="bg-danger-500 bg-opacity-10 border border-danger-500 rounded-lg p-4 text-danger-600 mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="name" className="label">Product Name <span className="text-danger-500">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="label">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select a category</option>
            {MOCK_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="price" className="label">Price (₹) <span className="text-danger-500">*</span></label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="input"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="label">Description <span className="text-danger-500">*</span></label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input"
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="image" className="label">Product Image <span className="text-danger-500">*</span></label>
          
          <div className="mt-2">
            {imagePreview ? (
              <div className="relative mb-4">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG or JPEG (max 5MB)</p>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full py-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            'Sell Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default SellProduct;
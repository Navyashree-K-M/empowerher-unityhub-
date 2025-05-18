import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { getProductById } from '../services/productService';
import { Product } from '../types';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Handwoven Cotton Scarf',
    description: 'Beautiful handwoven cotton scarf made with traditional techniques. This scarf is made of 100% cotton and features intricate patterns that showcase the skill of rural artisans. Each piece is unique and made with care. The natural dyes used are eco-friendly and the weaving techniques have been passed down through generations.',
    price: 350,
    image_url: 'https://images.pexels.com/photos/6773214/pexels-photo-6773214.jpeg',
    seller_id: 'user1',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Embroidered Table Runner',
    description: 'Elegant table runner with intricate hand embroidery. This beautiful piece will add a touch of elegance to any dining table or display surface. The intricate embroidery represents traditional motifs that tell stories of our cultural heritage. Made with love and attention to detail by skilled artisans.',
    price: 500,
    image_url: 'https://images.pexels.com/photos/6195663/pexels-photo-6195663.jpeg',
    seller_id: 'user2',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Ceramic Planter',
    description: 'Handcrafted ceramic planter perfect for indoor plants. Each planter is hand-thrown and glazed using traditional techniques. The design features a beautiful pattern inspired by nature, with drainage holes at the bottom to ensure healthy plant growth. This planter is not only functional but also serves as a beautiful decorative piece for your home.',
    price: 275,
    image_url: 'https://images.pexels.com/photos/6213041/pexels-photo-6213041.jpeg',
    seller_id: 'user3',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Silver Earrings',
    description: 'Traditional silver earrings with delicate filigree work. These stunning earrings showcase the incredible craftsmanship of our artisans who specialize in traditional silver work. The intricate filigree design catches the light beautifully and adds an elegant touch to any outfit. Each pair is handmade and slightly unique, making it a special piece of wearable art.',
    price: 450,
    image_url: 'https://images.pexels.com/photos/10529975/pexels-photo-10529975.jpeg',
    seller_id: 'user1',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Hand Painted Tote Bag',
    description: 'Eco-friendly canvas tote with beautiful hand-painted design. This sturdy tote bag is made from 100% cotton canvas and hand-painted with non-toxic, eco-friendly paints. The design features traditional motifs that tell stories from our cultural heritage. Perfect for shopping, carrying books, or as a casual everyday bag.',
    price: 300,
    image_url: 'https://images.pexels.com/photos/5650039/pexels-photo-5650039.jpeg',
    seller_id: 'user2',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Natural Soap Set',
    description: 'Set of 3 handmade soaps using organic ingredients. These natural soaps are crafted with care using traditional cold-process methods. The set includes three different varieties, each made with organic base oils, natural colorants, and essential oils for fragrance. Free from harsh chemicals, these soaps are gentle on your skin and environmentally friendly.',
    price: 200,
    image_url: 'https://images.pexels.com/photos/6683254/pexels-photo-6683254.jpeg',
    seller_id: 'user3',
    created_at: new Date().toISOString()
  }
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // In a real app, this would call the API
        // const data = await getProductById(id);
        
        // Mock data for now
        const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
        
        setTimeout(() => {
          if (mockProduct) {
            setProduct(mockProduct);
          } else {
            setError('Product not found');
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuy = () => {
    // In a real app, this would initiate the purchase process
    alert('Purchase functionality coming soon!');
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-danger-500 bg-opacity-10 text-danger-600 p-6 rounded-lg text-center">
        <p className="text-lg mb-4">{error || 'Product not found'}</p>
        <button onClick={goBack} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <button 
        onClick={goBack} 
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Marketplace
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-64 md:h-full w-full relative">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="text-2xl text-primary-600 font-bold mb-6">
              ₹{product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <button
              onClick={handleBuy}
              className="btn btn-primary w-full py-3 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
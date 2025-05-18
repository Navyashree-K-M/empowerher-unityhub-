import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="card group h-full flex flex-col">
        <div className="relative w-full pb-[75%] overflow-hidden rounded-md mb-3">
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-1 text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-auto pt-2 flex justify-between items-center">
            <span className="text-primary-600 font-bold">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
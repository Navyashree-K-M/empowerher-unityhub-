import React, { useState, useEffect } from 'react';

export interface FilterValues {
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  categories: string[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  onFilterChange, 
  categories
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    category: '',
    minPrice: 0,
    maxPrice: 10000,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Debounce filter changes
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = Number(value);
    if (type === 'min') {
      setFilters({ ...filters, minPrice: numValue });
    } else {
      setFilters({ ...filters, maxPrice: numValue });
    }
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: 0,
      maxPrice: 10000,
    });
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Filters</h2>
        <button 
          onClick={toggleFilters}
          className="md:hidden text-primary-600 text-sm font-medium"
        >
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className={`mt-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="space-y-4">
          <div>
            <label htmlFor="category" className="label">Category</label>
            <select
              id="category"
              value={filters.category}
              onChange={handleCategoryChange}
              className="input"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="minPrice" className="label">Minimum Price (₹)</label>
            <input
              type="number"
              id="minPrice"
              min="0"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="label">Maximum Price (₹)</label>
            <input
              type="number"
              id="maxPrice"
              min={filters.minPrice}
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="input"
            />
          </div>

          <button 
            onClick={resetFilters}
            className="btn btn-secondary w-full mt-2"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
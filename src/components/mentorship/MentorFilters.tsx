import React, { useState, useEffect } from 'react';

export interface MentorFilterValues {
  expertise: string;
  location: string;
}

interface MentorFiltersProps {
  onFilterChange: (filters: MentorFilterValues) => void;
  expertiseOptions: string[];
  locationOptions: string[];
}

const MentorFilters: React.FC<MentorFiltersProps> = ({ 
  onFilterChange, 
  expertiseOptions,
  locationOptions
}) => {
  const [filters, setFilters] = useState<MentorFilterValues>({
    expertise: '',
    location: '',
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, expertise: e.target.value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const resetFilters = () => {
    setFilters({
      expertise: '',
      location: '',
    });
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Find Mentors</h2>
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
            <label htmlFor="expertise" className="label">Industry/Expertise</label>
            <select
              id="expertise"
              value={filters.expertise}
              onChange={handleExpertiseChange}
              className="input"
            >
              <option value="">All Industries</option>
              {expertiseOptions.map(expertise => (
                <option key={expertise} value={expertise}>{expertise}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="label">Location</label>
            <select
              id="location"
              value={filters.location}
              onChange={handleLocationChange}
              className="input"
            >
              <option value="">All Locations</option>
              {locationOptions.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
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

export default MentorFilters;
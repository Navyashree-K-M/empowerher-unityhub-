import React, { useState, useEffect } from 'react';
import MentorCard from '../components/mentorship/MentorCard';
import MentorFilters, { MentorFilterValues } from '../components/mentorship/MentorFilters';
import { getMentors, requestMentorship } from '../services/mentorshipService';
import { Mentor } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const EXPERTISE_OPTIONS = [
  'Business & Entrepreneurship',
  'Technology & IT',
  'Healthcare',
  'Education',
  'Arts & Crafts',
  'Agriculture',
  'Finance',
  'Marketing'
];

const LOCATION_OPTIONS = [
  'Delhi NCR',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Remote/Online'
];

const MOCK_MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    expertise: 'Business & Entrepreneurship',
    location: 'Delhi NCR',
    photo_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    bio: 'Founder of a successful rural artisan marketplace with 10+ years of experience helping women entrepreneurs scale their businesses.'
  },
  {
    id: '2',
    name: 'Anjali Patel',
    expertise: 'Technology & IT',
    location: 'Bangalore',
    photo_url: 'https://images.pexels.com/photos/3782179/pexels-photo-3782179.jpeg',
    bio: 'Software engineer with expertise in teaching coding skills to beginners. Passionate about bringing more women into technology.'
  },
  {
    id: '3',
    name: 'Dr. Meera Reddy',
    expertise: 'Healthcare',
    location: 'Mumbai',
    photo_url: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg',
    bio: 'Healthcare professional specializing in women\'s health. Offers guidance on career paths in healthcare and wellness.'
  },
  {
    id: '4',
    name: 'Kavita Desai',
    expertise: 'Arts & Crafts',
    location: 'Jaipur',
    photo_url: 'https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg',
    bio: 'Master artisan who has built a global brand selling traditional crafts. Mentors women in developing craft-based businesses.'
  },
  {
    id: '5',
    name: 'Sunita Agarwal',
    expertise: 'Agriculture',
    location: 'Punjab',
    photo_url: 'https://images.pexels.com/photos/5905480/pexels-photo-5905480.jpeg',
    bio: 'Agricultural entrepreneur who has helped hundreds of women farmers improve productivity and build sustainable practices.'
  },
  {
    id: '6',
    name: 'Lakshmi Iyer',
    expertise: 'Finance',
    location: 'Chennai',
    photo_url: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
    bio: 'Financial advisor specialized in helping women achieve financial independence through smart money management and investment.'
  }
];

const Mentorship: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MentorFilterValues>({
    expertise: '',
    location: ''
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        // In a real app, this would call the API
        // const data = await getMentors(filters);
        
        // Mock data for now
        let filteredMentors = [...MOCK_MENTORS];
        
        if (filters.expertise) {
          filteredMentors = filteredMentors.filter(mentor => 
            mentor.expertise === filters.expertise
          );
        }
        
        if (filters.location) {
          filteredMentors = filteredMentors.filter(mentor => 
            mentor.location === filters.location
          );
        }
        
        setTimeout(() => {
          setMentors(filteredMentors);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load mentors. Please try again later.');
        setLoading(false);
      }
    };

    fetchMentors();
  }, [filters]);

  const handleFilterChange = (newFilters: MentorFilterValues) => {
    setFilters(newFilters);
  };

  const handleRequestMentorship = async (mentorId: string) => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: '/mentorship' } });
      return;
    }
    
    try {
      // In a real app, this would call the API
      // await requestMentorship(user.uid, mentorId);
      
      alert('Mentorship request sent successfully! The mentor will contact you soon.');
    } catch (err) {
      alert('Failed to send mentorship request. Please try again later.');
    }
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-1/4 md:sticky md:top-20 mb-6 md:mb-0 md:mr-6">
          <MentorFilters 
            onFilterChange={handleFilterChange}
            expertiseOptions={EXPERTISE_OPTIONS}
            locationOptions={LOCATION_OPTIONS}
          />
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Career Mentorship</h1>
            <p className="text-gray-600">
              Connect with experienced mentors who can guide your career journey and help you develop new skills.
            </p>
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
              {mentors.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 mb-4">No mentors found matching your criteria.</p>
                  <button
                    onClick={() => setFilters({ expertise: '', location: '' })}
                    className="btn btn-secondary"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mentors.map(mentor => (
                    <MentorCard 
                      key={mentor.id} 
                      mentor={mentor} 
                      onRequestMentorship={handleRequestMentorship}
                    />
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

export default Mentorship;
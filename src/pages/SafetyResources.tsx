import React, { useState, useEffect } from 'react';
import { getSafetyResources, MOCK_SAFETY_RESOURCES } from '../services/safetyService';
import { SafetyResource } from '../types';
import { ExternalLink, BookOpen, Info } from 'lucide-react';

const SafetyResources: React.FC = () => {
  const [resources, setResources] = useState<SafetyResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        // In a real app, this would call the API
        // const data = await getSafetyResources();
        
        // Mock data for now
        setTimeout(() => {
          setResources(MOCK_SAFETY_RESOURCES);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load safety resources. Please try again later.');
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const safetyTips = [
    'Always ensure someone knows your location when traveling',
    'Keep emergency contacts easily accessible on your phone',
    'Use the SOS feature in dangerous situations',
    'Trust your instincts - if something feels wrong, seek safety',
    'Avoid sharing personal information with strangers online',
    'Be aware of your surroundings, especially in unfamiliar places'
  ];

  return (
    <div className="fade-in">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Info className="h-6 w-6 text-primary-600 mr-2" />
          <h1 className="text-2xl font-bold">Safety Resources</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Access important safety information, tips, and resources to help you stay safe in any situation.
        </p>
        
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-semibold text-primary-700 mb-3">
            Safety Tips
          </h2>
          <ul className="space-y-2">
            {safetyTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block bg-primary-600 rounded-full h-2 w-2 mt-2 mr-3"></span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Helpful Resources</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-danger-500 bg-opacity-10 text-danger-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map(resource => (
            <div key={resource.id} className="card flex flex-col h-full">
              <div className="flex items-start mb-3">
                <div className="bg-primary-100 p-2 rounded-md mr-3">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold">{resource.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
              
              {resource.link && (
                <a 
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-600 hover:text-primary-700 font-medium mt-auto"
                >
                  View Resource
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SafetyResources;
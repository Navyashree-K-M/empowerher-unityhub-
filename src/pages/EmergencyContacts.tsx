import React, { useState, useEffect } from 'react';
import { getEmergencyContacts, MOCK_EMERGENCY_CONTACTS } from '../services/safetyService';
import { EmergencyContact } from '../types';
import { Phone, Heart, MapPin } from 'lucide-react';

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [region, setRegion] = useState<string>('All');

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        // In a real app, this would call the API
        // const data = await getEmergencyContacts(region !== 'All' ? region : undefined);
        
        // Mock data for now
        let filteredContacts = [...MOCK_EMERGENCY_CONTACTS];
        
        if (region !== 'All') {
          filteredContacts = filteredContacts.filter(contact => contact.region === region);
        }
        
        setTimeout(() => {
          setContacts(filteredContacts);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load emergency contacts. Please try again later.');
        setLoading(false);
      }
    };

    fetchContacts();
  }, [region]);

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fade-in">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Phone className="h-6 w-6 text-secondary-600 mr-2" />
          <h1 className="text-2xl font-bold">Emergency Contacts</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Important phone numbers that can provide immediate help in emergency situations.
        </p>
        
        <div className="mb-6">
          <label htmlFor="region" className="label">Filter by Region</label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="input"
          >
            <option value="All">All Regions</option>
            <option value="National">National</option>
            <option value="Local">Local</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secondary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-danger-500 bg-opacity-10 text-danger-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.length === 0 ? (
            <div className="text-center py-6 col-span-2">
              <p className="text-lg text-gray-600">No emergency contacts found for this region.</p>
            </div>
          ) : (
            contacts.map(contact => (
              <div key={contact.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{contact.name}</h3>
                    <div className="flex items-center text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{contact.region}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(contact.phone)}
                    className="bg-secondary-600 hover:bg-secondary-700 text-white rounded-full p-3"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-medium">{contact.phone}</span>
                  <button 
                    className="text-gray-500 hover:text-danger-500 flex items-center"
                    aria-label="Save to favorites"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;
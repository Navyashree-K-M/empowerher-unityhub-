import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { sendSosAlert } from '../../services/safetyService';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setMessage('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setMessage('Geolocation is not supported by your browser.');
    }
  };

  const handleSendSos = async () => {
    if (!location) {
      setMessage('Location is required to send an SOS alert.');
      return;
    }

    setIsLoading(true);
    setStatus('loading');

    try {
      await sendSosAlert({
        userId: user?.uid || 'anonymous',
        location: location,
        timestamp: new Date().toISOString()
      });
      
      setStatus('success');
      setMessage('SOS alert sent successfully. Emergency contacts have been notified.');
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error sending SOS:', error);
      setStatus('error');
      setMessage('Failed to send SOS alert. Please try again or call emergency services directly.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-danger-600 mb-2">Emergency SOS</h2>
          <p className="text-gray-600">
            Sending an SOS alert will share your current location with emergency contacts
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-success-500 bg-opacity-10 border border-success-500 rounded-lg p-4 text-success-600 mb-4">
            {message}
          </div>
        ) : status === 'error' ? (
          <div className="bg-danger-500 bg-opacity-10 border border-danger-500 rounded-lg p-4 text-danger-600 mb-4">
            {message}
          </div>
        ) : message ? (
          <div className="bg-warning-500 bg-opacity-10 border border-warning-500 rounded-lg p-4 text-warning-600 mb-4">
            {message}
          </div>
        ) : null}

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
            <span className="text-sm font-medium">
              {location ? 'Location detected' : 'Detecting your location...'}
            </span>
          </div>
          
          {location && (
            <div className="bg-gray-100 p-3 rounded-lg text-sm">
              <p>Latitude: {location.lat.toFixed(6)}</p>
              <p>Longitude: {location.lng.toFixed(6)}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleSendSos}
          disabled={isLoading || !location || status === 'success'}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
            isLoading || !location || status === 'success'
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-danger-600 hover:bg-danger-700 text-white'
          }`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Send SOS Alert
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SosModal;
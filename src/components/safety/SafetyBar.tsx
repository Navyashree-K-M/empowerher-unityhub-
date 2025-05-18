import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, Phone, ShieldAlert
} from 'lucide-react';
import SosModal from './SosModal';

const SafetyBar: React.FC = () => {
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  const handleSosClick = () => {
    setIsSosModalOpen(true);
  };

  return (
    <>
      <div className="safety-bar">
        <button 
          onClick={handleSosClick}
          className="safety-bar-button bg-danger-500 hover:bg-danger-600 text-white"
          aria-label="SOS Emergency"
        >
          <AlertTriangle className="h-6 w-6" />
          <span className="text-xs mt-1">SOS</span>
        </button>
        
        <Link 
          to="/emergency-contacts"
          className="safety-bar-button bg-secondary-600 hover:bg-secondary-700 text-white"
          aria-label="Emergency Contacts"
        >
          <Phone className="h-6 w-6" />
          <span className="text-xs mt-1">Contacts</span>
        </Link>
        
        <Link 
          to="/safety-resources"
          className="safety-bar-button bg-primary-600 hover:bg-primary-700 text-white"
          aria-label="Safety Resources"
        >
          <ShieldAlert className="h-6 w-6" />
          <span className="text-xs mt-1">Resources</span>
        </Link>
      </div>

      <SosModal 
        isOpen={isSosModalOpen} 
        onClose={() => setIsSosModalOpen(false)} 
      />
    </>
  );
};

export default SafetyBar;
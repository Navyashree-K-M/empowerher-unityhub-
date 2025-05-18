import React from 'react';
import { Mentor } from '../../types';

interface MentorCardProps {
  mentor: Mentor;
  onRequestMentorship: (mentorId: string) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onRequestMentorship }) => {
  return (
    <div className="card flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
          <img 
            src={mentor.photo_url} 
            alt={mentor.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
          <p className="text-primary-600 text-sm font-medium">{mentor.expertise}</p>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span className="text-gray-600">{mentor.location}</span>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {mentor.bio || "Experienced professional ready to guide and support your career journey."}
        </p>
      </div>
      
      <button
        onClick={() => onRequestMentorship(mentor.id)}
        className="btn btn-primary w-full"
      >
        Request Mentorship
      </button>
    </div>
  );
};

export default MentorCard;
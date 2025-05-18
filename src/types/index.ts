// ...existing code...

// Type definitions for user registration and login

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'mentor';
  location?: string;
}

export interface RegisterResponseBody {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'mentor';
  location?: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'mentor';
  location?: string;
}

// ...existing code...

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  seller_id: string;
  created_at: string;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string;
  location: string;
  photo_url: string;
  bio?: string;
}

export interface MentorshipRequest {
  id: string;
  user_id: string;
  mentor_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  region: string;
}

export interface SosAlert {
  userId: string;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string;
}

export interface SafetyResource {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'mentor';
  location?: string;
}
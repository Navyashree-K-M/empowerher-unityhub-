import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Users, ShieldAlert } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="fade-in">
      <section className="py-12 md:py-20 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-primary-700">
          Empowering Women Through Community
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-600">
          Connect, learn, and grow with a supportive network designed specifically for women in rural and semi-urban areas.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/marketplace" className="btn btn-primary px-6 py-3 text-lg">
            Explore Marketplace
          </Link>
          <Link to="/mentorship" className="btn btn-secondary px-6 py-3 text-lg">
            Find a Mentor
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            How EmpowerHer Helps You
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card flex flex-col items-center text-center p-6">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <ShoppingCart className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Marketplace</h3>
              <p className="text-gray-600 mb-4">
                Buy and sell handcrafted goods in our community marketplace. Showcase your skills and earn income.
              </p>
              <Link to="/marketplace" className="mt-auto text-primary-600 font-medium hover:underline">
                Browse Products
              </Link>
            </div>
            
            <div className="card flex flex-col items-center text-center p-6">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <Users className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mentorship</h3>
              <p className="text-gray-600 mb-4">
                Connect with experienced mentors who can guide you in your career and personal development.
              </p>
              <Link to="/mentorship" className="mt-auto text-primary-600 font-medium hover:underline">
                Find Mentors
              </Link>
            </div>
            
            <div className="card flex flex-col items-center text-center p-6">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <ShieldAlert className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safety Resources</h3>
              <p className="text-gray-600 mb-4">
                Access safety tools, emergency contacts, and resources to help you stay safe in any situation.
              </p>
              <Link to="/safety-resources" className="mt-auto text-primary-600 font-medium hover:underline">
                View Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Join Our Community Today
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-600">
            EmpowerHer connects women with resources, opportunities, and support. Create your account now to access all features.
          </p>
          <Link to="/register" className="btn btn-primary px-6 py-3 text-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
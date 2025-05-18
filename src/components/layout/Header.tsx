import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <ShieldAlert className="h-8 w-8 text-primary-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">EmpowerHer</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link 
              to="/"
              className={`text-gray-700 hover:text-primary-600 ${
                location.pathname === '/' ? 'font-bold text-primary-600' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/marketplace"
              className={`text-gray-700 hover:text-primary-600 ${
                location.pathname === '/marketplace' ? 'font-bold text-primary-600' : ''
              }`}
            >
              Marketplace
            </Link>
          </li>
          <li>
            <Link 
              to="/mentorship"
              className={`text-gray-700 hover:text-primary-600 ${
                location.pathname === '/mentorship' ? 'font-bold text-primary-600' : ''
              }`}
            >
              Mentorship
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to="/sell" 
                className="btn btn-primary"
              >
                Sell Product
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-primary-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary-600"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 right-0 z-50 fade-in">
          <ul className="flex flex-col p-4 space-y-3">
            <li>
              <Link 
                to="/" 
                className={`block py-2 text-gray-700 hover:text-primary-600 ${
                  location.pathname === '/' ? 'font-bold text-primary-600' : ''
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/marketplace" 
                className={`block py-2 text-gray-700 hover:text-primary-600 ${
                  location.pathname === '/marketplace' ? 'font-bold text-primary-600' : ''
                }`}
                onClick={closeMenu}
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link 
                to="/mentorship" 
                className={`block py-2 text-gray-700 hover:text-primary-600 ${
                  location.pathname === '/mentorship' ? 'font-bold text-primary-600' : ''
                }`}
                onClick={closeMenu}
              >
                Mentorship
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link 
                    to="/sell" 
                    className="block py-2 text-primary-600 font-medium hover:text-primary-700"
                    onClick={closeMenu}
                  >
                    Sell Product
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="block w-full text-left py-2 text-gray-700 hover:text-primary-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="block py-2 text-gray-700 hover:text-primary-600"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="block py-2 text-primary-600 font-medium hover:text-primary-700"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
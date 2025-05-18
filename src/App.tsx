import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import SafetyBar from './components/safety/SafetyBar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import SellProduct from './pages/SellProduct';
import Mentorship from './pages/Mentorship';
import SafetyResources from './pages/SafetyResources';
import EmergencyContacts from './pages/EmergencyContacts';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route 
            path="/sell" 
            element={
              <ProtectedRoute>
                <SellProduct />
              </ProtectedRoute>
            } 
          />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/safety-resources" element={<SafetyResources />} />
          <Route path="/emergency-contacts" element={<EmergencyContacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <SafetyBar />
    </div>
  );
}

export default App;
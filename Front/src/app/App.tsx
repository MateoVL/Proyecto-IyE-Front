import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomeView } from './components/HomeView';
import { LoginView } from './components/LoginView';
import { DirectorDashboard } from './components/DirectorDashboard';
import { NurseDashboard } from './components/NurseDashboard';
import { ScheduleAppointment } from './components/ScheduleAppointment';

type User = {
  name: string;
  role: string;
  email: string;
  avatar: string;
};

export default function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState<User>({
    name: '',
    role: '',
    email: '',
    avatar: '',
  });

  const handleLogin = (role?: 'director' | 'nurse') => {
    setIsAuthenticated(true);

    if (role === 'nurse') {
      setUser({
        name: 'Enf. Carmen Rodríguez',
        role: 'Enfermera',
        email: 'c.rodriguez@sanrafael.com',
        avatar: 'CR',
      });

      navigate('/nurse');
      return;
    }

    setUser({
      name: 'Dr. Roberto Martínez',
      role: 'Director Médico',
      email: 'r.martinez@sanrafael.com',
      avatar: 'RM',
    });

    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);

    setUser({
      name: '',
      role: '',
      email: '',
      avatar: '',
    });

    navigate('/');
  };

  const handleSelectRole = (role: 'director' | 'nurse') => {
    if (role === 'director') {
      setUser({
        name: 'Dr. Roberto Martínez',
        role: 'Director Médico',
        email: 'r.martinez@sanrafael.com',
        avatar: 'RM',
      });

      navigate('/director');
    } else {
      setUser({
        name: 'Enf. Carmen Rodríguez',
        role: 'Enfermera',
        email: 'c.rodriguez@sanrafael.com',
        avatar: 'CR',
      });

      navigate('/nurse');
    }
  };

  const ProtectedRoute = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        <Routes>
          {/* Públicas */}
          <Route
            path="/login"
            element={<LoginView onLogin={handleLogin} />}
          />

          {/* Protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeView onSelectRole={handleSelectRole} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/director"
            element={
              <ProtectedRoute>
                <DirectorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nurse"
            element={
              <ProtectedRoute>
                <NurseDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <ScheduleAppointment />
              </ProtectedRoute>
            }
          />

          {/* Ruta no encontrada */}
          <Route
            path="*"
            element={
              <Navigate
                to={isAuthenticated ? '/' : '/login'}
                replace
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
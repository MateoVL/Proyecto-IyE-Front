import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomeView } from './components/HomeView';
import { LoginView } from './components/LoginView';
import { DirectorDashboard } from './components/DirectorDashboard';
import { NurseDashboard } from './components/NurseDashboard';
import { ScheduleAppointment } from './components/ScheduleAppointment';
import { ConsentView } from './components/ConsentView';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

export default function App() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const navigate = useNavigate();

  const navUser = user
    ? {
      name: user.name,
      role: user.roles.includes('director') ? 'Director Médico' : 'Enfermera',
      email: user.email,
      avatar: user.avatar,
    }
    : { name: '', role: '', email: '', avatar: '' };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500 animate-pulse">Iniciando sesión...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={navUser}
        onLogin={() => navigate('/login')}
        onLogout={logout}
      />

      <main className="flex-1">
        <Routes>
          {/* Públicas */}
          <Route path="/login" element={<LoginView />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/consent" element={<ConsentView />} />

          {/* Protegidas */}
          <Route
            path="/director"
            element={
              <ProtectedRoute roles={['director']}>
                <DirectorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nurse"
            element={
              <ProtectedRoute roles={['nurse']}>
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

          {/* Acceso denegado */}
          <Route
            path="/unauthorized"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500 text-xl">
                  No tienes permisos para acceder a esta página.
                </p>
              </div>
            }
          />

          {/* Ruta raíz redirige a /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Ruta no encontrada redirige a /home */}
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
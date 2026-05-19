import { User, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
//import { NurseDashboard } from './components/NurseDashboard';
import { DirectorDashboard } from './components/DirectorDashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [viewMode, setViewMode] = useState<'director' | 'nurse'>('nurse');
  const [user, setUser] = useState({
    name: 'Enf. Carmen Rodríguez',
    role: 'Enfermera',
    email: 'c.rodriguez@sanrafael.com',
    avatar: 'CR'
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (viewMode === 'nurse') {
      setUser({
        name: 'Enf. Carmen Rodríguez',
        role: 'Enfermera',
        email: 'c.rodriguez@sanrafael.com',
        avatar: 'CR'
      });
    } else {
      setUser({
        name: 'Dr. Roberto Martínez',
        role: 'Director Médico',
        email: 'r.martinez@sanrafael.com',
        avatar: 'RM'
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ name: '', role: '', email: '', avatar: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      {isAuthenticated ? (
        <>
          {/* View Selector */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-[1400px] mx-auto px-6 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Vista:</span>
                <button
                  onClick={() => {
                    setViewMode('director');
                    setUser({
                      name: 'Dr. Roberto Martínez',
                      role: 'Director Médico',
                      email: 'r.martinez@sanrafael.com',
                      avatar: 'RM'
                    });
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'director'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Director Médico
                </button>
                <button
                  onClick={() => {
                    setViewMode('nurse');
                    setUser({
                      name: 'Enf. Carmen Rodríguez',
                      role: 'Enfermera',
                      email: 'c.rodriguez@sanrafael.com',
                      avatar: 'CR'
                    });
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'nurse'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Enfermería
                </button>
              </div>
            </div>
          </div>

          { viewMode === 'director' ? (
            <DirectorDashboard />
          ) : (
            // <NurseDashboard />
            <div className="flex items-center justify-center min-h-[calc(100vh-88px)]">
              <h2 className="text-2xl text-gray-700">Dashboard de Enfermería en construcción...</h2>
            </div>
          )}
        </>
      ) : (
        /* Login Screen */
        <div className="flex items-center justify-center min-h-[calc(100vh-88px)]">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="bg-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl mb-2">Bienvenido</h2>
              <p className="text-gray-600">Inicia sesión para acceder al sistema</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="usuario@sanrafael.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Sistema de gestión médica v1.0
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
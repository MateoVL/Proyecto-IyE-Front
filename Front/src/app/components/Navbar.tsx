import { Activity, LogOut, LogIn } from 'lucide-react';

interface User {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

interface NavbarProps {
  isAuthenticated: boolean;
  user: User;
  onLogin: () => void;
  onLogout: () => void;
}

export function Navbar({ isAuthenticated, user, onLogin, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">Centro Médico San Rafael</h1>
              <p className="text-sm text-gray-600">Sistema de Seguimiento</p>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* User Profile */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    {user.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.role}</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              /* Login Button */
              <button
                onClick={onLogin}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

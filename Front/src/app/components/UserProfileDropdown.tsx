import { LogOut, User, Edit, Mail, Phone, Shield, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface UserInfo {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

interface UserProfileDropdownProps {
  user: UserInfo;
  onLogout: () => void;
}

export function UserProfileDropdown({ user, onLogout }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditing(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios del usuario
    console.log('Guardando cambios:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
          {user.avatar}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-600">{user.role}</p>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-800">Mi Perfil</h3>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-blue-100 rounded transition-colors"
                  title="Editar perfil"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsEditing(false);
                }}
                className="p-1 hover:bg-white rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Avatar and Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
                {user.avatar}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                    placeholder="Nombre"
                  />
                ) : (
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Rol</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.role}
                    onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">{user.role}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">{user.email}</p>
                )}
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Guardar
                </button>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div className="border-t border-gray-200 p-3">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

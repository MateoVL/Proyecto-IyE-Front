import { Bell, X, AlertTriangle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: number;
  patientName: string;
  status: 'high' | 'critical';
  message: string;
  timestamp: string;
  read: boolean;
}


const initialNotifications: Notification[] = [
  {
    id: 1,
    patientName: 'Ana Rodríguez',
    status: 'critical',
    message: 'Paciente Ana Rodríguez está en estado CRÍTICO, se le envió un mensaje por WhatsApp. Debe agendarse un control.',
    timestamp: 'Hace 5 min',
    read: false
  },
  {
    id: 2,
    patientName: 'Juan Pérez Martín',
    status: 'high',
    message: 'Paciente Juan Pérez Martín está en estado ALTO, se le envió un mensaje por WhatsApp. Debe agendarse un control.',
    timestamp: 'Hace 15 min',
    read: false
  },
  {
    id: 3,
    patientName: 'María García López',
    status: 'high',
    message: 'Paciente María García López está en estado ALTO, se le envió un mensaje por WhatsApp. Debe agendarse un control.',
    timestamp: 'Hace 30 min',
    read: false
  },
  {
    id: 4,
    patientName: 'Francisco Ruiz',
    status: 'high',
    message: 'Paciente Francisco Ruiz está en estado ALTO, se le envió un mensaje por WhatsApp. Debe agendarse un control.',
    timestamp: 'Hace 1 hora',
    read: true
  }
];

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (notification: Notification) => {
  setNotifications(prev =>
    prev.map(n =>
      n.id === notification.id
        ? { ...n, read: true }
        : n
    )
  );

  const condition =
    notification.status === 'critical'
      ? 'EPOC - Estado Crítico'
      : 'Hipertensión - Estado Alto';

  navigate('/schedule', {
    state: {
      patientName: notification.patientName,
      patientCondition: condition
    }
  });

  setIsOpen(false);
};

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getStatusColor = (status: 'high' | 'critical') => {
    return status === 'critical' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-orange-100 text-orange-800 border-orange-300';
  };

  const getStatusLabel = (status: 'high' | 'critical') => {
    return status === 'critical' ? 'CRÍTICO' : 'ALTO';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="font-medium">Notificaciones</h3>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} sin leer</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Marcar todas como leídas
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No hay notificaciones</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${notification.status === 'critical' ? 'bg-red-100' : 'bg-orange-100'}`}>
                      <AlertTriangle className={`w-5 h-5 ${notification.status === 'critical' ? 'text-red-600' : 'text-orange-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(notification.status)}`}>
                          {getStatusLabel(notification.status)}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-800 mb-1">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        <span className="text-xs text-blue-500 hover:text-blue-600">
                          Agendar cita →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

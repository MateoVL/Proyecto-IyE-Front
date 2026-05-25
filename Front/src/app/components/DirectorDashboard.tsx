import { AlertCircle, TrendingUp, Users, Activity, Bell, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState, useEffect } from 'react';
import {
  getRecentAlerts,
  getActiveAlertsQuantity,
  getPatientsQuantity,
  type RecentAlertDto,
} from '../../services/dashboardService';

// ── Mock data estática (gráficos de tendencia — sin endpoint histórico aún) ──
const chartData = [
  { mes: 'Ene', controlados: 185, descompensados: 45, alertas: 12 },
  { mes: 'Feb', controlados: 192, descompensados: 42, alertas: 15 },
  { mes: 'Mar', controlados: 198, descompensados: 38, alertas: 18 },
  { mes: 'Abr', controlados: 205, descompensados: 35, alertas: 14 },
  { mes: 'May', controlados: 216, descompensados: 32, alertas: 23 },
];

const chronicPatients = [
  { id: 1, name: 'María García López', age: 68, condition: 'Diabetes Tipo 2', status: 'controlled', lastVisit: '2026-05-15', nextVisit: '2026-05-22' },
  { id: 2, name: 'Juan Pérez Martín', age: 72, condition: 'Hipertensión', status: 'warning', lastVisit: '2026-05-10', nextVisit: '2026-05-20' },
  { id: 3, name: 'Ana Rodríguez', age: 65, condition: 'EPOC', status: 'critical', lastVisit: '2026-05-18', nextVisit: '2026-05-21' },
  { id: 4, name: 'Carlos Sánchez', age: 75, condition: 'Insuficiencia Cardíaca', status: 'controlled', lastVisit: '2026-05-16', nextVisit: '2026-05-23' },
  { id: 5, name: 'Laura Fernández', age: 58, condition: 'Diabetes Tipo 1', status: 'controlled', lastVisit: '2026-05-17', nextVisit: '2026-05-24' },
  { id: 6, name: 'Pedro Gómez', age: 70, condition: 'Hipertensión', status: 'warning', lastVisit: '2026-05-14', nextVisit: '2026-05-21' },
];

export function DirectorDashboard() {
  // ── Estado local ────────────────────────────────────────────────────────────
  const [filterStatus,   setFilterStatus]   = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // ── Estado de datos del backend ─────────────────────────────────────────────
  const [totalPacientes, setTotalPacientes] = useState<number | null>(null);
  const [totalAlertas,   setTotalAlertas]   = useState<number | null>(null);
  const [alerts,         setAlerts]         = useState<RecentAlertDto[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState<string | null>(null);

  // ── Fetch de datos reales ────────────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [patientsRes, alertsQtyRes, recentAlertsRes] = await Promise.all([
        getPatientsQuantity(),
        getActiveAlertsQuantity(),
        getRecentAlerts(),
      ]);
      setTotalPacientes(patientsRes.data.quantity);
      setTotalAlertas(alertsQtyRes.data.quantity);
      setAlerts(recentAlertsRes.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al conectar con el backend';
      setError(msg);
      console.error('[DirectorDashboard] Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Métricas (mezcla real + estática) ────────────────────────────────────────
  const metricsData = [
    {
      id: 1, title: 'Pacientes Crónicos',
      value: totalPacientes !== null ? String(totalPacientes) : '—',
      change: '+12', icon: Users, color: 'bg-blue-500',
      live: true,
    },
    {
      id: 2, title: 'Alertas Activas',
      value: totalAlertas !== null ? String(totalAlertas) : '—',
      change: '+5', icon: AlertCircle, color: 'bg-red-500',
      live: true,
    },
    { id: 3, title: 'Seguimientos Hoy', value: '45', change: '+8', icon: Activity, color: 'bg-green-500', live: false },
    { id: 4, title: 'Tasa de Control',  value: '87%', change: '+3%', icon: TrendingUp, color: 'bg-purple-500', live: false },
  ];

  const filteredAlerts   = alerts.filter(a => filterPriority === 'all' || a.priority === filterPriority);
  const filteredPatients = chronicPatients.filter(p => filterStatus === 'all' || p.status === filterStatus);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high':     return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':   return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:         return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'controlled': return 'bg-green-100 text-green-800';
      case 'warning':    return 'bg-yellow-100 text-yellow-800';
      case 'critical':   return 'bg-red-100 text-red-800';
      default:           return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'controlled': return <CheckCircle className="w-4 h-4" />;
      case 'warning':    return <AlertCircle className="w-4 h-4" />;
      case 'critical':   return <XCircle className="w-4 h-4" />;
      default:           return null;
    }
  };

  const priorityLabel = (p: string) =>
    p === 'critical' ? 'Crítica' : p === 'high' ? 'Alta' : 'Media';

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2">Dashboard Director Médico</h1>
          <p className="text-gray-600">Seguimiento de Pacientes Crónicos</p>
        </div>

        {/* Botón refresh + estado de carga */}
        <div className="flex items-center gap-3">
          {error && (
            <span className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
              ⚠ {error}
            </span>
          )}
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricsData.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1.5">
                  {metric.live && (
                    <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400' : error ? 'bg-red-400' : 'bg-green-400'}`} title={loading ? 'Cargando...' : error ? 'Error' : 'Datos en vivo'} />
                  )}
                  <span className="text-sm text-green-600 font-medium">{metric.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{metric.title}</h3>
              <p className="text-3xl">{loading && metric.live ? '...' : metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl mb-4">Evolución de Pacientes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="controlados" stroke="#10b981" strokeWidth={2} name="Controlados" />
              <Line type="monotone" dataKey="descompensados" stroke="#ef4444" strokeWidth={2} name="Descompensados" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl mb-4">Alertas Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="alertas" fill="#f59e0b" name="Alertas Generadas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts and Patients Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts List — datos REALES del backend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-500" />
                <h2 className="text-xl">Alertas Recientes</h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">En vivo</span>
              </div>
              <select
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="critical">Críticas</option>
                <option value="high">Altas</option>
                <option value="medium">Medias</option>
              </select>
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-400 animate-pulse">Cargando alertas...</div>
            ) : filteredAlerts.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No hay alertas recientes.</div>
            ) : (
              filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{alert.patient}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(alert.priority)}`}>
                      {priorityLabel(alert.priority)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{alert.condition}</p>
                  <p className="text-sm mb-2">{alert.alert}</p>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chronic Patients List — datos estáticos por ahora */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl">Pacientes Crónicos</h2>
              </div>
              <select
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="controlled">Controlados</option>
                <option value="warning">En Observación</option>
                <option value="critical">Críticos</option>
              </select>
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-gray-600">{patient.age} años - {patient.condition}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                    {patient.status === 'controlled' ? 'Controlado' : patient.status === 'warning' ? 'Observación' : 'Crítico'}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>Última visita: {patient.lastVisit}</span>
                  <span>Próxima: {patient.nextVisit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
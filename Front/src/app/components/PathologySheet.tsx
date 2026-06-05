import { X, Activity, TrendingUp, AlertCircle, Calendar, FileText } from 'lucide-react';
import type { Condition, Indicator } from '../../services/nurseService';

interface PathologySheetProps {
  isOpen: boolean;
  onClose: () => void;
  condition: Condition | null;
}

export function PathologySheet({ isOpen, onClose, condition }: PathologySheetProps) {
  if (!isOpen || !condition) return null;

  const getStatusByValue = (
      indicator: Indicator
    ): 'normal' | 'warning' | 'critical' => {
      if (indicator.state === 'high' || indicator.state === 'critical') {
        return 'critical';
      }

      if (indicator.state === 'warning') {
        return 'warning';
      }

      return 'normal';
    };

  const getStatusColor = (status: 'normal' | 'warning' | 'critical') => {
    switch (status) {
      case 'normal': return 'bg-green-50 border-green-300 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-300 text-yellow-800';
      case 'critical': return 'bg-red-50 border-red-300 text-red-800';
    }
  };

  const getStatusIcon = (status: 'normal' | 'warning' | 'critical') => {
    switch (status) {
      case 'normal': return <Activity className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 my-4 max-h-[calc(100vh-100px)] overflow-y-auto border-2 border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{condition.name}</h2>
              <p className="text-sm text-gray-600">Ficha de Patología</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 leading-relaxed">{condition.description}</p>
          </div>

          {/* Indicators */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Indicadores Clave</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {condition.indicators && condition.indicators.length > 0 ? condition.indicators.map((indicator, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-lg ${getStatusColor(getStatusByValue(indicator))}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600 mb-1">{indicator.name}</p>
                      <p className="text-2xl font-bold">
                        {indicator.quantity} {indicator.unit && <span className="text-lg">{indicator.unit}</span>}
                      </p>
                    </div>
                    {getStatusIcon(getStatusByValue(indicator))}
                  </div>
                  {indicator.lower !== undefined && indicator.upper !== undefined && (
                    <p className="text-xs text-gray-600 mt-2">
                      <span className="font-medium">Rango objetivo:</span> {indicator.lower}-{indicator.upper} {indicator.unit}
                    </p>
                  )}
                </div>
              )) : (
                <p className="text-sm text-gray-600">No hay indicadores disponibles</p>
              )}
            </div>
          </div>

          {/* Last Update */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Última actualización: {new Date(condition.lastUpdate).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          {/* Notes */}
          {condition.notes && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-semibold text-gray-700">Notas Clínicas</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{condition.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

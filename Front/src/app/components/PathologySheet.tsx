import { X, Activity, TrendingUp, AlertCircle, Calendar, FileText } from 'lucide-react';

interface PathologyData {
  name: string;
  description: string;
  indicators: {
    label: string;
    value: string;
    unit?: string;
    status: 'normal' | 'warning' | 'critical';
    range?: string;
  }[];
  lastUpdate: string;
  notes?: string;
}

interface PathologySheetProps {
  isOpen: boolean;
  onClose: () => void;
  pathology: string;
}

const pathologyDatabase: { [key: string]: PathologyData } = {
  'Diabetes Tipo 1': {
    name: 'Diabetes Tipo 1',
    description: 'Condición autoinmune donde el páncreas produce poca o ninguna insulina.',
    indicators: [
      { label: 'Glucosa en Ayunas', value: '110', unit: 'mg/dL', status: 'normal', range: '70-130 mg/dL' },
      { label: 'HbA1c', value: '6.8', unit: '%', status: 'normal', range: '<7%' },
      { label: 'Última Medición', value: '105', unit: 'mg/dL', status: 'normal', range: '70-180 mg/dL' },
      { label: 'Tiempo en Rango', value: '78', unit: '%', status: 'normal', range: '>70%' }
    ],
    lastUpdate: '2026-05-19',
    notes: 'Paciente con buen control metabólico. Continuar con régimen actual de insulina.'
  },
  'Diabetes Tipo 2': {
    name: 'Diabetes Tipo 2',
    description: 'Trastorno metabólico caracterizado por resistencia a la insulina.',
    indicators: [
      { label: 'Glucosa en Ayunas', value: '145', unit: 'mg/dL', status: 'warning', range: '70-130 mg/dL' },
      { label: 'HbA1c', value: '7.2', unit: '%', status: 'warning', range: '<7%' },
      { label: 'Última Medición', value: '280', unit: 'mg/dL', status: 'critical', range: '70-180 mg/dL' },
      { label: 'IMC', value: '28.5', unit: 'kg/m²', status: 'warning', range: '18.5-24.9' }
    ],
    lastUpdate: '2026-05-19',
    notes: 'Valores elevados en última medición. Ajustar dosis de metformina y reforzar plan alimenticio.'
  },
  'Hipertensión': {
    name: 'Hipertensión Arterial',
    description: 'Presión arterial persistentemente elevada en las arterias.',
    indicators: [
      { label: 'Presión Sistólica', value: '165', unit: 'mmHg', status: 'critical', range: '<140 mmHg' },
      { label: 'Presión Diastólica', value: '95', unit: 'mmHg', status: 'warning', range: '<90 mmHg' },
      { label: 'Frecuencia Cardíaca', value: '78', unit: 'lpm', status: 'normal', range: '60-100 lpm' },
      { label: 'Promedio Semanal', value: '152/88', unit: 'mmHg', status: 'warning', range: '<130/80 mmHg' }
    ],
    lastUpdate: '2026-05-19',
    notes: 'Presión arterial elevada en últimas 72 horas. Considerar ajuste de medicación antihipertensiva.'
  },
  'EPOC': {
    name: 'Enfermedad Pulmonar Obstructiva Crónica',
    description: 'Enfermedad pulmonar que causa obstrucción del flujo de aire.',
    indicators: [
      { label: 'Saturación O2', value: '88', unit: '%', status: 'critical', range: '>92%' },
      { label: 'FEV1', value: '45', unit: '%', status: 'warning', range: '>80%' },
      { label: 'Frecuencia Respiratoria', value: '22', unit: 'rpm', status: 'warning', range: '12-20 rpm' },
      { label: 'Última Crisis', value: '15 días', unit: '', status: 'normal', range: '>30 días' }
    ],
    lastUpdate: '2026-05-19',
    notes: 'Saturación baja persistente. Evaluar necesidad de oxigenoterapia domiciliaria.'
  },
  'Insuficiencia Cardíaca': {
    name: 'Insuficiencia Cardíaca',
    description: 'Condición donde el corazón no bombea sangre de manera eficiente.',
    indicators: [
      { label: 'Fracción de Eyección', value: '35', unit: '%', status: 'critical', range: '>50%' },
      { label: 'Peso', value: '78', unit: 'kg', status: 'warning', range: '75 kg (basal)' },
      { label: 'Variación Peso', value: '+3', unit: 'kg', status: 'critical', range: '<2 kg en 48h' },
      { label: 'Edema', value: 'Leve', unit: '', status: 'warning', range: 'Ausente' }
    ],
    lastUpdate: '2026-05-19',
    notes: 'Aumento de peso significativo en 48h. Monitorear signos de descompensación. Ajustar diuréticos.'
  },
  'Arritmia': {
    name: 'Arritmia Cardíaca',
    description: 'Alteración del ritmo cardíaco normal.',
    indicators: [
      { label: 'Frecuencia Cardíaca', value: '105', unit: 'lpm', status: 'warning', range: '60-100 lpm' },
      { label: 'Tipo', value: 'Fibrilación Auricular', unit: '', status: 'warning', range: 'Ritmo Sinusal' },
      { label: 'Último ECG', value: '5 días', unit: '', status: 'normal', range: '<7 días' },
      { label: 'Episodios/Día', value: '3', unit: '', status: 'warning', range: '<1' }
    ],
    lastUpdate: '2026-05-19',
    notes: 'Frecuencia cardíaca irregular persistente. Mantener anticoagulación y control de frecuencia.'
  }
};

export function PathologySheet({ isOpen, onClose, pathology }: PathologySheetProps) {
  if (!isOpen) return null;

  const data = pathologyDatabase[pathology] || {
    name: pathology,
    description: 'Información no disponible',
    indicators: [],
    lastUpdate: new Date().toISOString().split('T')[0],
    notes: 'No hay datos registrados para esta patología.'
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
              <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
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
            <p className="text-sm text-gray-700 leading-relaxed">{data.description}</p>
          </div>

          {/* Indicators */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Indicadores Clave</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.indicators.map((indicator, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-lg ${getStatusColor(indicator.status)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600 mb-1">{indicator.label}</p>
                      <p className="text-2xl font-bold">
                        {indicator.value} {indicator.unit && <span className="text-lg">{indicator.unit}</span>}
                      </p>
                    </div>
                    {getStatusIcon(indicator.status)}
                  </div>
                  {indicator.range && (
                    <p className="text-xs text-gray-600 mt-2">
                      <span className="font-medium">Rango objetivo:</span> {indicator.range}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Last Update */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Última actualización: {new Date(data.lastUpdate).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          {/* Notes */}
          {data.notes && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-semibold text-gray-700">Notas Clínicas</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{data.notes}</p>
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

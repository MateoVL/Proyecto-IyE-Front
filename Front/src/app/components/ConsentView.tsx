import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, FileText, ChevronDown, ChevronUp, CheckCircle, Circle, Printer, Scale, Lock, UserCheck, AlertTriangle, Eye, Heart, ClipboardList, ArrowLeft } from 'lucide-react';

interface ConsentSection {
    id: string;
    title: string;
    content: string;
    icon: React.ReactNode;
}

const ley20584_derechos: ConsentSection[] = [
    {
        id: 'd1',
        title: 'Derecho a la Información',
        icon: <Eye className="w-5 h-5" />,
        content: 'Toda persona tiene derecho a ser informada en forma oportuna y comprensible acerca de su estado de salud, posible diagnóstico, alternativas de tratamiento disponibles, riesgos que ello pueda representar y el pronóstico esperado. También tiene derecho a conocer los costos de su atención de salud. (Art. 8°, Ley 20.584)'
    },
    {
        id: 'd2',
        title: 'Derecho a un Trato Digno y sin Discriminación',
        icon: <UserCheck className="w-5 h-5" />,
        content: 'Toda persona tiene derecho a ser tratada con respeto, sin discriminación por origen, género, edad, condición social, enfermedad o cualquier otra circunstancia. Incluye el derecho a ser llamada por su nombre, que se proteja su pudor, y a recibir información adaptada a su condición (pueblos originarios, discapacidad sensorial, etc.). (Art. 5°–7°, Ley 20.584)'
    },
    {
        id: 'd3',
        title: 'Derecho al Consentimiento Informado',
        icon: <CheckCircle className="w-5 h-5" />,
        content: 'Toda intervención requiere que el paciente —o su representante legal— otorgue consentimiento libre, voluntario, expreso e informado. Para intervenciones quirúrgicas, procedimientos diagnósticos o terapéuticos invasivos, o procedimientos con riesgo relevante conocido, debe constar por escrito la información entregada, la aceptación o rechazo, y la firma cuando corresponda. Un consentimiento genérico o prefabricado no es suficiente; debe ser un acto informado y adaptado al paciente. (Art. 14°–16°, Ley 20.584)'
    },
    {
        id: 'd4',
        title: 'Derecho a Aceptar o Rechazar Tratamientos',
        icon: <Shield className="w-5 h-5" />,
        content: 'El paciente tiene derecho a aceptar o rechazar cualquier tratamiento, así como a solicitar el alta voluntaria. Este derecho es fundamental para la autonomía del paciente y debe ser respetado por todos los integrantes del equipo de salud. (Art. 14°–17°, Ley 20.584)'
    },
    {
        id: 'd5',
        title: 'Derecho a la Confidencialidad y Ficha Clínica',
        icon: <Lock className="w-5 h-5" />,
        content: 'La ficha clínica es propiedad del prestador, pero la información es del paciente. El paciente tiene derecho a solicitar y obtener copia íntegra de su historia clínica, gratuita la primera vez, dentro de un plazo razonable. La información de salud está protegida por el secreto profesional y la Ley 19.628. Solo puede compartirse con consentimiento del paciente, salvo excepciones legales (orden judicial, fines estadísticos anonimizados, o notificación de enfermedades de declaración obligatoria). La ficha clínica debe conservarse por al menos 15 años. (Art. 19°–24°, Ley 20.584)'
    },
    {
        id: 'd6',
        title: 'Derecho a la Identificación del Equipo de Salud',
        icon: <FileText className="w-5 h-5" />,
        content: 'Toda persona tiene derecho a que todos los miembros del equipo de salud que la atiendan cuenten con un sistema visible de identificación personal, incluyendo la función que desempeñan, así como a saber quién autoriza y efectúa sus diagnósticos y tratamientos. (Art. 9°, Ley 20.584)'
    },
    {
        id: 'd7',
        title: 'Derecho en Investigación Científica',
        icon: <ClipboardList className="w-5 h-5" />,
        content: 'El paciente tiene derecho a ser incluido en estudios de investigación científica solo si lo autoriza expresamente. Su manifestación de voluntad debe ser previa, expresa, libre, informada, personal y constar por escrito. En ningún caso esta decisión puede significar un menoscabo en su atención ni sanción alguna. (Art. 28°–30°, Ley 20.584)'
    },
    {
        id: 'd8',
        title: 'Otros Derechos Reconocidos',
        icon: <Heart className="w-5 h-5" />,
        content: 'Recibir visitas, compañía y asistencia espiritual. No ser grabado ni fotografiado con fines de difusión sin su permiso. Derecho a solicitar una segunda opinión médica. Personas mayores de 60 años y/o con discapacidad tienen derecho a atención preferente. (Art. 6°, 10°–12°, Ley 20.584)'
    }
];

const ley20584_deberes: ConsentSection[] = [
    {
        id: 'deb1',
        title: 'Deber de Informar Verazmente',
        icon: <FileText className="w-5 h-5" />,
        content: 'El paciente tiene el deber de entregar información veraz acerca de su enfermedad, identidad y dirección. La entrega de información falsa o incompleta puede afectar la calidad de la atención recibida. (Art. 36°, Ley 20.584)'
    },
    {
        id: 'deb2',
        title: 'Deber de Trato Respetuoso',
        icon: <UserCheck className="w-5 h-5" />,
        content: 'El paciente tiene el deber de tratar respetuosamente a los integrantes del equipo de salud. Esta obligación se extiende igualmente a familiares, representantes legales y otras personas que los acompañen o visiten. (Art. 36°, Ley 20.584)'
    },
    {
        id: 'deb3',
        title: 'Deber de Colaborar con el Equipo de Salud',
        icon: <CheckCircle className="w-5 h-5" />,
        content: 'Tanto el paciente como sus familiares o representantes legales deben colaborar con los miembros del equipo de salud, entregando la información necesaria para el tratamiento y siguiendo las indicaciones médicas. (Art. 36°, Ley 20.584)'
    },
    {
        id: 'deb4',
        title: 'Deber de Cuidar las Instalaciones',
        icon: <Shield className="w-5 h-5" />,
        content: 'El paciente tiene el deber de cuidar las instalaciones y equipamiento del recinto de salud. Asimismo, debe dar prioridad a personas con derecho a atención preferente. (Art. 36°, Ley 20.584)'
    }
];

const ley19628_sections: ConsentSection[] = [
    {
        id: 'p1',
        title: 'Objeto y Ámbito de Aplicación',
        icon: <Scale className="w-5 h-5" />,
        content: 'La Ley 19.628 regula la forma y condiciones en que se efectúa el tratamiento y protección de los datos personales de personas naturales. Todo tratamiento realizado por personas naturales, jurídicas u organismos públicos queda sujeto a sus disposiciones, debiendo respetar los derechos y libertades fundamentales. Fue modificada y actualizada por la Ley 21.719 (publicada el 13 de diciembre de 2024).'
    },
    {
        id: 'p2',
        title: 'Datos Sensibles de Salud',
        icon: <Heart className="w-5 h-5" />,
        content: 'Los datos de salud son clasificados como datos sensibles y requieren protección especial. No pueden ser objeto de tratamiento salvo cuando la ley lo autorice expresamente, exista consentimiento del titular, o sean necesarios para la determinación u otorgamiento de beneficios de salud. Los datos genéticos, proteómicos o metabólicos solo pueden tratarse para los fines previstos por la ley. Se prohíbe el tratamiento y la cesión de datos relativos a la salud cuando no se cumplan las condiciones legales establecidas. (Art. 2°, 10°, Ley 19.628)'
    },
    {
        id: 'p3',
        title: 'Consentimiento para el Tratamiento de Datos',
        icon: <CheckCircle className="w-5 h-5" />,
        content: 'El consentimiento es un requisito fundamental para el tratamiento de datos personales. Debe ser previo, expreso, libre e informado. El titular de los datos tiene derecho a revocar su consentimiento en cualquier momento. En el contexto de CrónicoTrack, el uso de los datos clínicos del paciente para su seguimiento y monitoreo de condiciones crónicas requiere de este consentimiento explícito.'
    },
    {
        id: 'p4',
        title: 'Derecho de Acceso a los Datos',
        icon: <Eye className="w-5 h-5" />,
        content: 'Toda persona tiene derecho a exigir al responsable del banco de datos información sobre los datos relativos a su persona, su procedencia y destinatario, el propósito del almacenamiento, y la individualización de las personas u organismos a los cuales sus datos son transmitidos regularmente. (Art. 12°, Ley 19.628)'
    },
    {
        id: 'p5',
        title: 'Derecho de Rectificación',
        icon: <FileText className="w-5 h-5" />,
        content: 'El titular de datos tiene derecho a solicitar y obtener del responsable la rectificación de los datos personales que sean inexactos, desactualizados o incompletos. Los datos rectificados deben ser comunicados a todas las personas u organismos a quienes se les hubieren transmitido. Una vez rectificados, no se podrán volver a tratar los datos sin rectificar. (Art. 16°, Ley 19.628)'
    },
    {
        id: 'p6',
        title: 'Responsabilidades y Sanciones',
        icon: <AlertTriangle className="w-5 h-5" />,
        content: 'El responsable de los registros o bases de datos personales debe cuidarlos con la debida diligencia, haciéndose responsable de los daños. La Agencia de Protección de Datos Personales (creada por Ley 21.719) administra el Registro Nacional de Sanciones y Cumplimiento. En el sector salud, la Superintendencia de Salud fiscaliza el cumplimiento de estas disposiciones en los prestadores de salud.'
    },
    {
        id: 'p7',
        title: 'Elaboración de Perfiles',
        icon: <ClipboardList className="w-5 h-5" />,
        content: 'La elaboración de perfiles se define como toda forma de tratamiento automatizado de datos personales para evaluar, analizar o predecir aspectos relativos al rendimiento, situación económica, salud, preferencias, comportamiento o movimientos de una persona. En CrónicoTrack, el análisis de patrones de alerta y el seguimiento de condiciones crónicas se realiza únicamente con fines clínicos y con el consentimiento informado del titular.'
    }
];

function AccordionSection({ sections, accentColor }: { sections: ConsentSection[]; accentColor: string }) {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div className="space-y-2">
            {sections.map((section) => {
                const isOpen = openId === section.id;
                return (
                    <div
                        key={section.id}
                        className="border border-gray-300 rounded-lg overflow-hidden transition-shadow hover:shadow-sm"
                    >
                        <button
                            onClick={() => setOpenId(isOpen ? null : section.id)}
                            className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${isOpen ? `${accentColor} text-white font-bold` : 'bg-white hover:bg-gray-100 text-slate-900 font-semibold'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={isOpen ? 'text-white' : 'text-slate-800'}>
                                    {section.icon}
                                </span>
                                <span className="font-semibold text-sm">{section.title}</span>
                            </div>
                            {isOpen ? (
                                <ChevronUp className="w-4 h-4 flex-shrink-0 text-white" />
                            ) : (
                                <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-600" />
                            )}
                        </button>
                        {isOpen && (
                            <div className="px-5 py-4 bg-slate-50 border-t border-gray-200">
                                <p className="text-sm text-slate-900 leading-relaxed font-normal">{section.content}</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

interface ConsentCheckState {
    informado: boolean;
    datos: boolean;
    derechos: boolean;
    deberes: boolean;
    plataforma: boolean;
}

export function ConsentView() {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState<'20584' | '19628' | 'form'>('20584');
    const [checks, setChecks] = useState<ConsentCheckState>({
        informado: false,
        datos: false,
        derechos: false,
        deberes: false,
        plataforma: false
    });
    const [patientName, setPatientName] = useState('');
    const [patientRut, setPatientRut] = useState('');
    const [representanteName, setRepresentanteName] = useState('');
    const [consentDate] = useState(new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }));
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const state = location.state as { patientName?: string; patientRut?: string; patient?: any } | null;
        if (state) {
            if (state.patientName) {
                setPatientName(state.patientName);
            }
            if (state.patientRut || state.patient?.rut) {
                setPatientRut(state.patientRut || state.patient?.rut || '');
            }
            if (state.patientName || state.patient) {
                setActiveTab('form');
            }
        }
    }, [location.state]);

    const allChecked = Object.values(checks).every(Boolean);
    const canSubmit = allChecked && patientName.trim() !== '' && patientRut.trim() !== '';

    const toggleCheck = (key: keyof ConsentCheckState) => {
        setChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = () => {
        if (canSubmit) {
            setSubmitted(true);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/home');
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto p-6">
            {/* Header */}
            <div className="mb-8 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Scale className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">Marco Legal de Consentimiento</h1>
                            <p className="text-white font-medium text-sm">
                                Información de derechos, deberes y protección de datos personales — CrónicoTrack
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Volver</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors text-sm"
                        >
                            <Printer className="w-4 h-4" />
                            <span>Imprimir</span>
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/20 border border-white/30 rounded-xl p-4">
                        <p className="text-xs text-white uppercase tracking-wider mb-1 font-bold">Ley 20.584</p>
                        <p className="text-white font-bold text-sm">Derechos y Deberes de las Personas en Salud</p>
                        <p className="text-white/90 text-xs mt-1 font-medium">Publicada D.O. 24 de abril de 2012</p>
                    </div>
                    <div className="bg-white/20 border border-white/30 rounded-xl p-4">
                        <p className="text-xs text-white uppercase tracking-wider mb-1 font-bold">Ley 19.628</p>
                        <p className="text-white font-bold text-sm">Protección de la Vida Privada y Datos Personales</p>
                        <p className="text-white/90 text-xs mt-1 font-medium">Modificada por Ley 21.719, D.O. 13 de diciembre de 2024</p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6 bg-gray-200 p-1.5 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('20584')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === '20584'
                        ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                        : 'text-slate-700 hover:text-slate-950 font-semibold'
                        }`}
                >
                    Ley 20.584
                </button>
                <button
                    onClick={() => setActiveTab('19628')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === '19628'
                        ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                        : 'text-slate-700 hover:text-slate-950 font-semibold'
                        }`}
                >
                    Ley 19.628
                </button>
                <button
                    onClick={() => setActiveTab('form')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'form'
                        ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                        : 'text-slate-700 hover:text-slate-950 font-semibold'
                        }`}
                >
                    <span>Formulario de Consentimiento</span>
                    {allChecked && <span className="w-2 h-2 bg-green-600 rounded-full" />}
                </button>
            </div>

            {/* Tab: Ley 20.584 */}
            {activeTab === '20584' && (
                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-300 rounded-xl p-5">
                        <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-blue-800 mt-0.5 flex-shrink-0" />
                            <div>
                                <h2 className="text-slate-950 font-bold mb-1 text-base">
                                    Ley N° 20.584 — Regula los Derechos y Deberes que tienen las Personas en Relación con Acciones Vinculadas a su Atención en Salud
                                </h2>
                                <p className="text-slate-900 text-sm leading-relaxed font-normal">
                                    Esta ley se aplica a cualquier prestador de salud, sea público o privado, así como a todos los profesionales y trabajadores que atiendan público o se vinculen con el otorgamiento de atenciones de salud. Los pacientes del sistema CrónicoTrack son titulares de todos los derechos aquí descritos.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Derechos */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-6 w-1 bg-blue-600 rounded-full" />
                            <h3 className="text-slate-900 font-bold text-lg">Derechos del Paciente</h3>
                            <span className="text-xs text-slate-800 bg-gray-200 font-semibold px-2.5 py-0.5 rounded-full">{ley20584_derechos.length} artículos</span>
                        </div>
                        <AccordionSection sections={ley20584_derechos} accentColor="bg-blue-600" />
                    </div>

                    {/* Deberes */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-6 w-1 bg-orange-500 rounded-full" />
                            <h3 className="text-slate-900 font-bold text-lg">Deberes del Paciente</h3>
                            <span className="text-xs text-slate-800 bg-gray-200 font-semibold px-2.5 py-0.5 rounded-full">{ley20584_deberes.length} artículos</span>
                        </div>
                        <AccordionSection sections={ley20584_deberes} accentColor="bg-orange-500" />
                    </div>

                    {/* Reclamaciones */}
                    <div className="bg-amber-50 border border-amber-300 rounded-xl p-5">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-800 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-amber-950 font-bold mb-1 text-sm">¿Cómo reclamar si se vulneran sus derechos?</h4>
                                <p className="text-slate-900 text-sm leading-relaxed font-normal">
                                    El paciente puede reclamar directamente ante el establecimiento de salud donde fue atendido. Si no recibe respuesta en un plazo de 15 días hábiles, o si la respuesta no le satisface, puede recurrir a la <strong className="text-slate-950">Superintendencia de Salud</strong>. En caso de persistir la vulneración, la Superintendencia puede sancionar con multas de hasta 100 UTM. (Título IV, Ley 20.584)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Ley 19.628 */}
            {activeTab === '19628' && (
                <div className="space-y-6">
                    <div className="bg-indigo-50 border border-indigo-300 rounded-xl p-5">
                        <div className="flex items-start gap-3">
                            <Lock className="w-5 h-5 text-indigo-800 mt-0.5 flex-shrink-0" />
                            <div>
                                <h2 className="text-slate-950 font-bold mb-1 text-base">
                                    Ley N° 19.628 — Sobre Protección de la Vida Privada y Datos Personales
                                </h2>
                                <p className="text-slate-900 text-sm leading-relaxed font-normal">
                                    Esta ley regula el tratamiento de datos personales efectuado por organismos públicos o privados. Los datos de salud son considerados <strong className="text-slate-950">datos sensibles</strong> y están sujetos a un nivel de protección reforzada. CrónicoTrack trata los datos de sus pacientes de conformidad con esta normativa, garantizando su confidencialidad, integridad y uso exclusivamente clínico.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-6 w-1 bg-indigo-600 rounded-full" />
                            <h3 className="text-slate-900 font-bold text-lg">Principios y Disposiciones Aplicables</h3>
                            <span className="text-xs text-slate-800 bg-gray-200 font-semibold px-2.5 py-0.5 rounded-full">{ley19628_sections.length} secciones</span>
                        </div>
                        <AccordionSection sections={ley19628_sections} accentColor="bg-indigo-600" />
                    </div>

                    {/* Uso de datos en CrónicoTrack */}
                    <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-4 border-b border-gray-200">
                            <h4 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                                <Shield className="w-4 h-4 text-indigo-800" />
                                Uso de Datos Personales en CrónicoTrack
                            </h4>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Finalidad del tratamiento', value: 'Seguimiento y monitoreo de condiciones crónicas de salud con fines exclusivamente clínicos.' },
                                    { label: 'Responsable del tratamiento', value: 'Clínica San Rafael — Dirección Médica y Equipo de Enfermería.' },
                                    { label: 'Datos tratados', value: 'Nombre, RUT, datos de contacto, historial clínico, condiciones médicas, medicamentos y mediciones de salud.' },
                                    { label: 'Plazo de conservación', value: 'Mínimo 15 años desde la última atención, conforme al Art. 22° de la Ley 20.584.' },
                                    { label: 'Base legal del tratamiento', value: 'Consentimiento informado del titular y cumplimiento de obligaciones legales en materia de salud.' },
                                    { label: 'Derechos ejercibles', value: 'Acceso, rectificación, cancelación y oposición ante el responsable del tratamiento o la Superintendencia de Salud.' }
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">{item.label}</p>
                                        <p className="text-sm text-slate-900 font-medium leading-relaxed">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-300 rounded-xl p-5">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-purple-800 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-purple-950 font-bold mb-1 text-sm">Agencia de Protección de Datos Personales</h4>
                                <p className="text-slate-900 text-sm leading-relaxed font-normal">
                                    La Ley 21.719 (2024) creó la <strong className="text-slate-950">Agencia de Protección de Datos Personales</strong>, que administra el Registro Nacional de Sanciones y Cumplimiento. Adicionalmente, la <strong className="text-slate-950">Superintendencia de Salud</strong> fiscaliza a los prestadores de salud respecto al cumplimiento de las disposiciones de protección de datos en el contexto clínico.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Formulario de Consentimiento */}
            {activeTab === 'form' && (
                <div className="space-y-6">
                    {submitted ? (
                        <div className="bg-green-50 border border-green-300 rounded-2xl p-10 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-700" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-green-950 mb-2">Consentimiento Registrado</h2>
                            <p className="text-slate-900 text-sm mb-6">
                                El consentimiento de <strong className="text-slate-950">{patientName}</strong> (RUT: {patientRut}) ha sido registrado exitosamente el {consentDate}.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setPatientName(''); setPatientRut(''); setRepresentanteName(''); setChecks({ informado: false, datos: false, derechos: false, deberes: false, plataforma: false }); }}
                                className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm"
                            >
                                Nuevo Consentimiento
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Intro */}
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                                <p className="text-slate-900 text-sm leading-relaxed font-normal">
                                    El presente formulario tiene por objeto documentar el consentimiento informado del paciente o su representante legal respecto al tratamiento de sus datos clínicos en la plataforma CrónicoTrack, de conformidad con la Ley N° 20.584 sobre Derechos y Deberes en Atención de Salud y la Ley N° 19.628 sobre Protección de la Vida Privada. Lea atentamente cada declaración antes de marcarla.
                                </p>
                            </div>

                            {/* Patient Data */}
                            <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 border-b border-gray-200">
                                    <h3 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                                        <UserCheck className="w-4 h-4 text-blue-700" />
                                        Datos de Identificación
                                    </h3>
                                </div>
                                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-1.5">Nombre completo del paciente <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            placeholder="Ej: María García López"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-1.5">RUT del paciente <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={patientRut}
                                            onChange={(e) => setPatientRut(e.target.value)}
                                            placeholder="Ej: 12.345.678-9"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-slate-900 mb-1.5">
                                            Nombre del representante legal <span className="text-gray-500 font-normal">(si aplica)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={representanteName}
                                            onChange={(e) => setRepresentanteName(e.target.value)}
                                            placeholder="Completar solo si el paciente no puede firmar por sí mismo"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-slate-900 mb-1.5">Fecha</label>
                                        <p className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-800 font-medium">{consentDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Consent Checkboxes */}
                            <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 border-b border-gray-200">
                                    <h3 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-blue-700" />
                                        Declaraciones de Consentimiento
                                    </h3>
                                    <p className="text-xs text-slate-700 mt-1 font-medium">Marque cada declaración para confirmar su comprensión y aceptación.</p>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {([
                                        {
                                            key: 'informado' as const,
                                            label: 'Consentimiento Informado (Ley 20.584, Art. 14°)',
                                            text: 'Declaro haber sido informado/a de manera oportuna y comprensible sobre el diagnóstico de mis condiciones crónicas, las alternativas de seguimiento disponibles a través de la plataforma CrónicoTrack, y los riesgos o limitaciones asociados. Acepto libremente el seguimiento clínico a través de este sistema.'
                                        },
                                        {
                                            key: 'datos' as const,
                                            label: 'Tratamiento de Datos Personales de Salud (Ley 19.628)',
                                            text: 'Autorizo el tratamiento de mis datos personales de salud —incluyendo historial clínico, condiciones médicas, medicamentos y mediciones— en la plataforma CrónicoTrack, exclusivamente con fines de seguimiento y monitoreo clínico. Entiendo que puedo revocar este consentimiento en cualquier momento.'
                                        },
                                        {
                                            key: 'derechos' as const,
                                            label: 'Conocimiento de Derechos (Ley 20.584, Título II)',
                                            text: 'Declaro conocer mis derechos como paciente: derecho a la información, a un trato digno y sin discriminación, a la confidencialidad de mi ficha clínica, a aceptar o rechazar tratamientos, y a acceder a mi historial clínico. Conozco las vías de reclamación ante la Superintendencia de Salud.'
                                        },
                                        {
                                            key: 'deberes' as const,
                                            label: 'Aceptación de Deberes (Ley 20.584, Título III)',
                                            text: 'Me comprometo a cumplir con mis deberes como paciente: entregar información veraz sobre mi estado de salud y datos de contacto, colaborar con el equipo de salud que me atiende, y tratar con respeto a los profesionales de la institución.'
                                        },
                                        {
                                            key: 'plataforma' as const,
                                            label: 'Uso de la Plataforma CrónicoTrack',
                                            text: 'Entiendo que la plataforma CrónicoTrack es una herramienta de apoyo al seguimiento clínico y no reemplaza la atención médica presencial. El equipo de salud puede contactarme mediante los canales registrados (incluyendo WhatsApp) para coordinación de citas y seguimiento, lo que acepto expresamente.'
                                        }
                                    ]).map(({ key, label, text }) => (
                                        <div
                                            key={key}
                                            onClick={() => toggleCheck(key)}
                                            className={`flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors ${checks[key] ? 'bg-green-50' : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="mt-0.5 flex-shrink-0">
                                                {checks[key] ? (
                                                    <CheckCircle className="w-5 h-5 text-green-700" />
                                                ) : (
                                                    <Circle className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold mb-1 ${checks[key] ? 'text-green-950' : 'text-slate-900'}`}>{label}</p>
                                                <p className="text-sm text-slate-800 leading-relaxed font-normal">{text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Progress indicator */}
                            <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-700 font-semibold">Declaraciones completadas</span>
                                    <span className="text-sm font-bold text-slate-950">
                                        {Object.values(checks).filter(Boolean).length} / {Object.values(checks).length}
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-600 rounded-full transition-all duration-500"
                                        style={{ width: `${(Object.values(checks).filter(Boolean).length / Object.values(checks).length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex items-center justify-between gap-4 pt-2">
                                <p className="text-xs text-slate-700 font-medium">
                                    Al enviar este formulario, el consentimiento quedará registrado en el sistema con la fecha y datos indicados, de conformidad con la legislación chilena vigente.
                                </p>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!canSubmit}
                                    className={`flex-shrink-0 flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-all ${canSubmit
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Registrar Consentimiento
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

import { useState } from "react";
import { Activity, LogIn, Eye, EyeOff, Shield, Heart, BarChart3, Lock } from "lucide-react";

interface LoginViewProps {
  onLogin: (role: "director" | "nurse") => void;
}

const CREDENTIALS = {
  director: { email: "r.martinez@sanrafael.com", password: "director123" },
  nurse: { email: "c.rodriguez@sanrafael.com", password: "enfermeria123" },
};

const FEATURES = [
  { icon: Heart, label: "Seguimiento de pacientes crónicos en tiempo real" },
  { icon: BarChart3, label: "Métricas y estadísticas para decisiones clínicas" },
  { icon: Shield, label: "Alertas inteligentes y gestión de riesgos" },
];

export function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (
        email === CREDENTIALS.director.email &&
        password === CREDENTIALS.director.password
      ) {
        onLogin("director");
      } else if (
        email === CREDENTIALS.nurse.email &&
        password === CREDENTIALS.nurse.password
      ) {
        onLogin("nurse");
      } else {
        setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
      }
    }, 800);
  };

  const fillCredentials = (role: "director" | "nurse") => {
    setEmail(CREDENTIALS[role].email);
    setPassword(CREDENTIALS[role].password);
    setError("");
  };

  return (
    <div className="min-h-[calc(100vh-88px)] flex">
      {/* Left Panel — Branded */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex-col justify-between p-14 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 -left-24 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-indigo-900/40 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/30 rounded-full" />
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-blue-300/40 rounded-full" />
          <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-white/15 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
              <Activity className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">CrónicoTrack</h1>
              <p className="text-blue-200 text-sm">Centro Médico San Rafael</p>
            </div>
          </div>
        </div>

        {/* Center headline */}
        <div className="relative z-10 py-8">
          <h2 className="text-5xl font-bold text-white leading-tight mb-6">
            Cuidado continuo,<br />
            <span className="text-blue-200">decisiones precisas.</span>
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-md">
            Plataforma integral de seguimiento para pacientes con condiciones crónicas, diseñada para equipos médicos exigentes.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-4">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="bg-white/15 rounded-lg p-2 shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-blue-100 text-sm">{label}</span>
            </div>
          ))}
          <p className="text-blue-300/60 text-xs pt-3">
            © 2026 Centro Médico San Rafael · Sistema de Seguimiento v1.0
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="bg-blue-500 p-2.5 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-none">CrónicoTrack</p>
              <p className="text-xs text-gray-500">Centro Médico San Rafael</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Iniciar sesión</h2>
            <p className="text-gray-500">Accede con tus credenciales institucionales</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="usuario@sanrafael.com"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Recordar sesión</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              <span>{loading ? "Verificando..." : "Iniciar sesión"}</span>
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center mb-3 uppercase tracking-wide font-medium">
              Acceso de demostración
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fillCredentials("director")}
                className="flex flex-col items-center gap-1 px-3 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <span className="text-xl">👨‍⚕️</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">Director Médico</span>
                <span className="text-[10px] text-gray-400">Dr. Roberto Martínez</span>
              </button>
              <button
                type="button"
                onClick={() => fillCredentials("nurse")}
                className="flex flex-col items-center gap-1 px-3 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <span className="text-xl">👩‍⚕️</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">Enfermería</span>
                <span className="text-[10px] text-gray-400">Enf. Carmen Rodríguez</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Activity, Mail, Phone, MapPin, Heart, Lock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-50 bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Centro Médico San Rafael</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sistema integral de seguimiento de pacientes crónicos. Brindando atención de calidad y monitoreo continuo para mejorar la salud de nuestros pacientes.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+56 2 2345 6789</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>contacto@sanrafael.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Av. Providencia 1234, Santiago, Chile</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Portal de Pacientes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Agendar Hora
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Resultados de Exámenes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Políticas de Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Centro Médico San Rafael. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-xs flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            Todos los datos están cifrados (AES-256) y no son de acceso público.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>para mejorar la salud</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

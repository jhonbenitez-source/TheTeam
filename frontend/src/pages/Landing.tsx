import React from 'react';
import { Trophy, Users, Zap, BarChart3, Calendar, Share2, ArrowRight, Check } from 'lucide-react';

export default function Landing({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="TheTeam" className="w-10 h-10 rounded-full" />
            <span className="font-black text-2xl text-emerald-600">TheTeam</span>
          </div>
          <nav className="hidden md:flex gap-8 text-gray-700">
            <a href="#inicio" className="hover:text-emerald-600 transition">Inicio</a>
            <a href="#caracteristicas" className="hover:text-emerald-600 transition">Características</a>
            <a href="#planes" className="hover:text-emerald-600 transition">Planes</a>
            <a href="#contacto" className="hover:text-emerald-600 transition">Contacto</a>
          </nav>
          <button
            onClick={onGetStarted}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-black mb-4 leading-tight">
              ¡EL MÁS FÁCIL CAMINO PARA GESTIONAR TU TORNEO!
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Gestiona torneos, equipos y jugadores de forma automática. Tablas, rankings y resultados en tiempo real.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-white text-emerald-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition inline-flex items-center gap-2"
            >
              Crear un Torneo <ArrowRight size={20} />
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 text-center">
            <Trophy size={80} className="text-emerald-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Descarga la aplicación TheTeam y ten toda la información de tu campeonato en la palma de tu mano.</p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="caracteristicas" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-gray-900">Características Principales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Usar Gratis</h3>
              <p className="text-gray-600 mb-4">
                ¡Listo para usar! Puedes comenzar a usarlo inmediatamente, sin necesidad de registrar tu información financiera.
              </p>
              <button onClick={onGetStarted} className="text-emerald-600 font-bold hover:underline">
                Regístrate →
              </button>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Tabla de Posiciones y Rankings</h3>
              <p className="text-gray-600 mb-4">
                Tablas y rankings de jugadores automáticamente calculadas, goleadores y rankings. Disponible para varias modalidades deportivas.
              </p>
              <button onClick={onGetStarted} className="text-emerald-600 font-bold hover:underline">
                Crear un Torneo →
              </button>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Aplicación Flexible</h3>
              <p className="text-gray-600 mb-4">
                Interfaz simple y práctica para crear campeonatos con más de una categoría y con diferentes modelos de fases y rondas.
              </p>
              <button onClick={onGetStarted} className="text-emerald-600 font-bold hover:underline">
                Crear un Torneo →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900">¡Todo para organizar tu torneo!</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Nuestro objetivo principal es ayudar a los organizadores a gestionar sus torneos, permitiéndoles publicar tablas, resultados de partidos, fotos y videos para que los participantes y espectadores puedan seguir e interactuar con los resultados.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Generador de partidos automático',
              'Clasificación personalizada de jugadores',
              'Fotos, videos y noticias',
              'Resumen impreso de partidos',
              'Estadísticas de partidos',
              'Formulario de registro de equipos'
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <Check className="text-emerald-600 flex-shrink-0" size={24} />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="planes" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900">Nuestros Planes</h2>
          <p className="text-center text-gray-600 text-lg mb-12">¡Tenemos planes que se ajustan a tu presupuesto!</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Plan 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-600 text-white p-6">
                <h3 className="text-xl font-bold mb-2">Pequeño</h3>
                <p className="text-3xl font-black">$4.70<span className="text-lg">/Mes</span></p>
              </div>
              <div className="p-6 space-y-3">
                {['Hasta 300 jugadores por torneo', 'Hasta 3 patrocinadores', 'Torneo sin anuncios', 'Campeonatos ilimitados'].map((feature, i) => (
                  <div key={i} className="flex gap-2">
                    <Check size={16} className="text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t">
                <button onClick={onGetStarted} className="w-full bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700 transition">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-600 text-white p-6">
                <h3 className="text-xl font-bold mb-2">Intermedio</h3>
                <p className="text-3xl font-black">$6.00<span className="text-lg">/Mes</span></p>
              </div>
              <div className="p-6 space-y-3">
                {['Hasta 600 jugadores por torneo', 'Hasta 6 patrocinadores', 'Torneo sin anuncios', 'Campeonatos ilimitados'].map((feature, i) => (
                  <div key={i} className="flex gap-2">
                    <Check size={16} className="text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t">
                <button onClick={onGetStarted} className="w-full bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700 transition">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-emerald-600">
              <div className="bg-emerald-600 text-white p-6">
                <h3 className="text-xl font-bold mb-2">Grande</h3>
                <p className="text-3xl font-black">$7.50<span className="text-lg">/Mes</span></p>
              </div>
              <div className="p-6 space-y-3">
                {['Hasta 900 jugadores por torneo', 'Hasta 12 patrocinadores', 'Torneo sin anuncios', 'Campeonatos ilimitados'].map((feature, i) => (
                  <div key={i} className="flex gap-2">
                    <Check size={16} className="text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t">
                <button onClick={onGetStarted} className="w-full bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700 transition">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Plan 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-600 text-white p-6">
                <h3 className="text-xl font-bold mb-2">Profesional</h3>
                <p className="text-3xl font-black">$10.30<span className="text-lg">/Mes</span></p>
              </div>
              <div className="p-6 space-y-3">
                {['Jugadores ilimitados', 'Patrocinadores ilimitados', 'Torneo sin anuncios', 'Acceso a API JSON'].map((feature, i) => (
                  <div key={i} className="flex gap-2">
                    <Check size={16} className="text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t">
                <button onClick={onGetStarted} className="w-full bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700 transition">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900">¡NUESTROS CLIENTES APRUEBAN!</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Organizadores de torneos de todo el mundo utilizan TheTeam para varios deportes</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Soy usuario de TheTeam desde hace más de un año y no puedo imaginar la gestión de un campeonato sin ella. Antes, tenía que lidiar con tablas y cálculos complicados.",
              "Con TheTeam, todo se volvió mucho más fácil y práctico. Puedo crear un campeonato en solo unos minutos, agregando equipos y definiendo el formato de la competición.",
              "TheTeam tiene varias funcionalidades que hacen que la gestión de campeonatos sea más eficiente, como la capacidad de enviar mensajes a los equipos.",
              "TheTeam es una herramienta esencial para aquellos que organizan campeonatos. Con él, ahorro tiempo y tranquilidad. Muy recomendado."
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 border-l-4 border-emerald-600">
                <p className="text-gray-700 italic">"{review}"</p>
                <p className="text-emerald-600 font-bold mt-4">⭐⭐⭐⭐⭐</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-20 bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">¿Tienes alguna pregunta?</h2>
          <p className="text-xl mb-8 text-emerald-100">¡Habla con nuestro equipo! Responderemos tan pronto como sea posible.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://wa.me" className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
              💬 Chat en WhatsApp
            </a>
            <a href="mailto:info@theteam.com" className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-emerald-800 transition">
              📧 info@theteam.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">TheTeam</h4>
              <p className="text-sm">Gestión profesional de torneos deportivos.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Producto</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#caracteristicas" className="hover:text-white transition">Características</a></li>
                <li><a href="#planes" className="hover:text-white transition">Planes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Términos de Servicio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <p className="text-sm">info@theteam.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 TheTeam. Todos los derechos reservados.</p>
            <p>Desarrollado por PortoSoft</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

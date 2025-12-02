import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';

// URL de la API desde el .env (o fallback por si acaso)
// URL directa a tu Codespace (sin usar .env para asegurar que funcione)
const API_URL = 'https://automatic-fortnight-4jpr47xp6rjrhpqv-5000.app.github.dev/api';
interface LoginProps {
  onLoginSuccess: (user: any) => void;
  onBackToLanding?: () => void;
  // Props antiguos ignorados para limpieza
  auth?: any; 
  demoMode?: boolean; 
}

export default function Login({ onLoginSuccess, onBackToLanding }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  // Estado del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState(''); // ¡Nuevo campo requerido por tu backend!

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Validaciones básicas del frontend
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      if (!isLogin) {
        if (password !== confirmPassword) throw new Error('Las contraseñas no coinciden');
        if (!fullName.trim()) throw new Error('El nombre completo es obligatorio');
      }

      // 2. Preparar datos para el Backend
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const url = `${API_URL}${endpoint}`;
      
      const payload: any = { email, password };
      if (!isLogin) {
        payload.fullName = fullName; // Enviamos el nombre solo en registro
      }

      // 3. Petición al Backend Real
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
      }

      // 4. Éxito: Guardar Token y notificar
      if (data.token) {
        // Guardamos el token para futuras peticiones
        localStorage.setItem('token', data.token);
        
        // Guardamos datos del usuario
        localStorage.setItem('user', JSON.stringify(data.user)); // Opcional, para mostrar nombre en UI
        
        // Notificamos a la App principal que ya entramos
        onLoginSuccess(data.user);
      } else {
        throw new Error('El servidor no devolvió un token');
      }

    } catch (err: any) {
      console.error('Login Error:', err);
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center p-4">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full opacity-10"></div>
      </div>

      {/* Card de Login */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-8 text-center relative">
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="absolute left-4 top-4 flex items-center gap-1 text-white hover:text-emerald-100 transition text-xs font-semibold"
              >
                <ArrowLeft size={16} />
                Volver
              </button>
            )}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 overflow-hidden">
               {/* Asegúrate de que logo.png exista en public, si no, usa un icono */}
               <img src="/logo.png" onError={(e) => e.currentTarget.style.display='none'} alt="" className="w-full h-full object-cover" />
               <LogIn className="w-8 h-8 text-emerald-600 absolute opacity-0" style={{ opacity: 0 }} /> 
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">TheTeam</h1>
            <p className="text-emerald-100">Gestión de deportes y equipos</p>
          </div>

          {/* Contenido */}
          <div className="p-8">
            {/* Tabs (Login vs Register) */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  isLogin ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <LogIn className="w-4 h-4 inline mr-2" />
                Ingresar
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  !isLogin ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <UserPlus className="w-4 h-4 inline mr-2" />
                Registro
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleAuth} className="space-y-4">
              
              {/* CAMPO: Nombre Completo (Solo en Registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2 text-emerald-600" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* CAMPO: Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2 text-emerald-600" />
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              {/* CAMPO: Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2 text-emerald-600" />
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* CAMPO: Confirmar Contraseña (Solo Registro) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2 text-emerald-600" />
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Mensaje de Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm flex gap-2 items-center">
                  <span className="font-semibold text-lg">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Botón de Acción */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Procesando...
                  </>
                ) : isLogin ? (
                  <>
                    <LogIn className="w-5 h-5" /> Iniciar Sesión
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" /> Crear Cuenta
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
               © 2025 TheTeam
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
import { Clock, Users, Camera, TrendingUp, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-black" />
              <span className="text-xl font-semibold">TimeFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/sign-in"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/sign-up"
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg"
              >
                Comenzar gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-8">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">100% gratis para siempre</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
              Control de tiempo
              <span className="block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                inteligente y simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Rastrea las horas de tus empleados con reconocimiento facial.
              Preciso, automático y sin complicaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all hover:shadow-xl hover:scale-105"
              >
                Empezar ahora →
              </Link>
              <a
                href="#features"
                className="border-2 border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:border-gray-300 transition-all"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <Camera className="h-12 w-12 mb-4 text-gray-900" />
                  <div className="h-2 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <Clock className="h-12 w-12 mb-4 text-gray-900" />
                  <div className="h-2 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <TrendingUp className="h-12 w-12 mb-4 text-gray-900" />
                  <div className="h-2 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una solución completa para gestionar el tiempo de tu equipo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-black rounded-xl p-3 w-fit mb-6">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Reconocimiento facial
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Los empleados marcan entrada y salida con su rostro.
                  Sin tarjetas, sin contraseñas, sin fraudes.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-black rounded-xl p-3 w-fit mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Tracking automático
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Captura automática de horas trabajadas.
                  Cálculos precisos de tiempo y reportes en tiempo real.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-black rounded-xl p-3 w-fit mb-6">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Analytics poderosos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Visualiza patrones, exporta reportes y toma decisiones
                  basadas en datos reales de asistencia.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-black rounded-xl p-3 w-fit mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Gestión de equipos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Administra múltiples empleados, departamentos y
                  horarios desde un solo lugar.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-black rounded-xl p-3 w-fit mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Seguro y privado
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Datos biométricos encriptados. Cumplimos con
                  regulaciones de privacidad y protección de datos.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-black rounded-xl p-3 w-fit mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Súper rápido
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Check-in en menos de 2 segundos. Interface moderna
                  y responsive que funciona en cualquier dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-600">
              Tres pasos simples para empezar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Regístrate gratis
              </h3>
              <p className="text-gray-600">
                Crea tu cuenta en segundos. No necesitas tarjeta de crédito.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Agrega empleados
              </h3>
              <p className="text-gray-600">
                Registra a tu equipo con sus datos y fotos faciales.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Empieza a trackear
              </h3>
              <p className="text-gray-600">
                Tu equipo marca entrada/salida con reconocimiento facial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para simplificar tu control de tiempo?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Únete a empresas que ya confían en TimeFlow para gestionar
            sus equipos de manera inteligente.
          </p>
          <Link
            href="/sign-up"
            className="inline-block bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-xl hover:scale-105"
          >
            Comenzar gratis ahora →
          </Link>
          <p className="text-gray-400 mt-6 text-sm">
            Sin tarjeta de crédito • Gratis para siempre • Setup en 5 minutos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              <span className="font-semibold">TimeFlow</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 TimeFlow. Control de tiempo inteligente.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Privacidad</a>
              <a href="#" className="hover:text-gray-900">Términos</a>
              <a href="#" className="hover:text-gray-900">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react"
import { Link } from "react-router-dom"
import NavbarLanding from "../components/navbar/navbarLanding"
import Footer from "../components/footer/footer"


function App() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <NavbarLanding/>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Crea tu CV profesional en minutos
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Diseña un currículum que destaque con nuestras plantillas profesionales y editor fácil de usar. ¡Sin
              experiencia en diseño necesaria!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg">
                <Link to="/editor"> Comenzar Ahora</Link>
              </button>
              <button className="px-8 py-4 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-lg">
                Ver Plantillas
              </button>
            </div>
          </div>
          <div className="relative">
            <img src="https://placehold.co/600x400" alt="CV Builder Preview" className="rounded-lg shadow-2xl w-full" />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold">4.9/5</span>
                <span className="text-gray-600">(2,945 reseñas)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas para un CV perfecto</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Herramientas intuitivas y funciones poderosas que hacen que crear un CV sea rápido y sencillo.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⏱️",
                title: "Rápido y Fácil",
                description: "Crea tu CV profesional en menos de 15 minutos con nuestro editor intuitivo.",
              },
              {
                icon: "✨",
                title: "Plantillas Profesionales",
                description: "Elige entre docenas de plantillas diseñadas por expertos en reclutamiento.",
              },
              {
                icon: "🔄",
                title: "Comparte Fácilmente",
                description: "Exporta tu CV en PDF o comparte un enlace directo con los reclutadores.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-purple-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Lo que dicen nuestros usuarios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María García",
                role: "Diseñadora UX",
                content:
                  "Conseguí mi trabajo soñado gracias al CV que creé con CVMaker. ¡El proceso fue increíblemente fácil!",
              },
              {
                name: "Carlos Rodríguez",
                role: "Desarrollador Web",
                content: "Las plantillas son modernas y profesionales. Me encanta poder personalizar cada detalle.",
              },
              {
                name: "Ana Martínez",
                role: "Marketing Manager",
                content: "La mejor inversión para mi carrera. En 10 minutos tenía un CV que realmente me representa.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comienza tu camino hacia el éxito profesional</h2>
          <p className="text-lg md:text-xl mb-8 text-purple-100">
            Únete a miles de profesionales que ya han creado su CV perfecto
          </p>
          <button className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-lg">
            Crear mi CV Ahora
          </button>
        </div>
      </section>

    </div>
  )
}

export default App


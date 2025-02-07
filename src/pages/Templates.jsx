import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Templates() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState([]) // Inicialización correcta como arreglo
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/templates")
      console.log("Respuesta de la API:", response.data) // Agrega esta línea para ver la respuesta completa

      // Verifica si los datos recibidos son un arreglo
      if (Array.isArray(response.data)) {
        setTemplates(response.data) // Solo establece templates si es un arreglo
      } else {
        throw new Error("Datos no válidos")
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching templates:", err)
      setError("Error al cargar las plantillas")
      setLoading(false)
    }
  }

  const handleTemplateSelect = async (template) => {
    try {
      // Guardar la selección en la base de datos
      await axios.post("http://localhost:3000/api/templates/select", {
        templateId: template.id,
        userId: 1, // Esto debería venir de tu sistema de autenticación
        data: template.data,
      })

      // Guardar en localStorage para uso inmediato
      localStorage.setItem("selectedTemplate", JSON.stringify(template.data))
      navigate("/editor")
    } catch (err) {
      console.error("Error selecting template:", err)
      alert("Error al seleccionar la plantilla")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando plantillas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchTemplates}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-xl font-bold text-purple-600">CVMaker</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-sm font-medium hover:text-purple-600">
              Inicio
            </a>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Crear CV desde Cero
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Elige tu Plantilla</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona entre nuestras plantillas profesionales diseñadas para destacar tu perfil y conseguir más
            entrevistas.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(templates) && templates.length > 0 ? (
            templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                {/* Template Preview */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-200">{template.description}</p>
                    </div>
                  </div>
                </div>

                {/* Template Actions */}
                <div className="p-6 bg-white space-y-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleTemplateSelect(template)}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Usar Plantilla
                    </button>
                    <button
                      onClick={() => window.open(`/preview/${template.id}`, "_blank")}
                      className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      Vista Previa
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay plantillas disponibles</p>
          )}
        </div>
      </main>
    </div>
  )
}

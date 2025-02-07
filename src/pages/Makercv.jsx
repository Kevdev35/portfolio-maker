import { useState } from "react"
import NavbarEditor from "../components/navbar/navbarEditor"
import Footer from "../components/footer/footer"
import {Trash2, Plus} from 'lucide-react'

export default function MakerCv() {
  const [cvData, setCvData] = useState({
    name: "",
    sections: [
      { id: "personal", title: "Información Personal", content: "", type: "text" },
      { id: "experience", title: "Experiencia Profesional", content: "", type: "text" },
      { id: "education", title: "Educación", content: "", type: "text" },
    ],
    languages: [],
    skills: [],
  })

  const handleChange = (id, value) => {
    setCvData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === id ? { ...section, content: value } : section)),
    }))
  }

  const handleNameChange = (e) => {
    setCvData((prev) => ({ ...prev, name: e.target.value }))
  }

  const addNewSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: "Nueva Sección",
      content: "",
      type: "text",
    }
    setCvData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
  }

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now(),
      name: "",
      level: "Básico",
    }
    setCvData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLanguage],
    }))
  }

  const updateLanguage = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    }))
  }

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: "",
      level: 50,
    }
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkill = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeSection = (id) => {
    setCvData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }))
  }

  const removeLanguage = (id) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }))
  }

  const removeSkill = (id) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <NavbarEditor/>

      {/* Editor de dos columnas */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna del editor */}
          <div className="space-y-6">
            {/* Panel de control */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Agregar Elementos</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={addNewSection}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Plus/> Nueva Sección
                </button>
                <button
                  onClick={addLanguage}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Plus/> Idioma
                </button>
                <button
                  onClick={addSkill}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Plus/>Habilidad
                </button>
              </div>
            </div>

            {/* Editor principal */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <div className="space-y-4">
                {/* Nombre del CV */}
                <div className="space-y-2">
                  <label htmlFor="cv-name" className="block text-sm font-medium text-gray-700">
                    Nombre del CV
                  </label>
                  <input
                    type="text"
                    id="cv-name"
                    value={cvData.name}
                    onChange={handleNameChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Mi CV Profesional"
                  />
                </div>

                {/* Secciones dinámicas */}
                {cvData.sections.map((section) => (
                  <div key={section.id} className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                          setCvData((prev) => ({
                            ...prev,
                            sections: prev.sections.map((s) =>
                              s.id === section.id ? { ...s, title: e.target.value } : s,
                            ),
                          }))
                        }}
                        className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:border-purple-500 focus:ring-0 outline-none"
                      />
                      <button onClick={() => removeSection(section.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 />
                      </button>
                    </div>
                    <textarea
                      value={section.content}
                      onChange={(e) => handleChange(section.id, e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                      placeholder={`Describe tu ${section.title.toLowerCase()}...`}
                    />
                  </div>
                ))}

                {/* Idiomas */}
                {cvData.languages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Idiomas</h3>
                    {cvData.languages.map((language) => (
                      <div key={language.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                        <input
                          type="text"
                          value={language.name}
                          onChange={(e) => updateLanguage(language.id, "name", e.target.value)}
                          placeholder="Idioma"
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <select
                          value={language.level}
                          onChange={(e) => updateLanguage(language.id, "level", e.target.value)}
                          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option>Básico</option>
                          <option>Intermedio</option>
                          <option>Avanzado</option>
                          <option>Nativo</option>
                        </select>
                        <button onClick={() => removeLanguage(language.id)} className="text-red-500 hover:text-red-700">
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Habilidades */}
                {cvData.skills.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Habilidades</h3>
                    {cvData.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                          placeholder="Habilidad"
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="range"
                          value={skill.level}
                          onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                          min="0"
                          max="100"
                          className="w-32"
                        />
                        <span className="w-12 text-center">{skill.level}%</span>
                        <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700">
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna de vista previa */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Vista Previa</h2>

              {/* Vista previa del CV */}
              <div className="space-y-6 p-4 border border-gray-200 rounded-lg min-h-[600px]">
                {cvData.name && <h1 className="text-3xl font-bold text-gray-900">{cvData.name}</h1>}

                {/* Secciones */}
                {cvData.sections.map(
                  (section) =>
                    section.content && (
                      <div key={section.id} className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                        <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
                      </div>
                    ),
                )}

                {/* Idiomas */}
                {cvData.languages.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">Idiomas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {cvData.languages.map((language) => (
                        <div key={language.id} className="flex justify-between">
                          <span className="font-medium">{language.name}</span>
                          <span className="text-gray-600">{language.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Habilidades */}
                {cvData.skills.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">Habilidades</h3>
                    <div className="space-y-3">
                      {cvData.skills.map((skill) => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-gray-600">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${skill.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import { useState } from "react"
import jsPDF from "jspdf"
import { FaMoon, FaSun } from "react-icons/fa"
import { IoAlertCircleSharp } from "react-icons/io5"
import { Trash2, Plus, Download, Menu } from "lucide-react"
import { Link } from "react-router-dom"

export default function MakerCv() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode

      if (newMode) {
        document.body.classList.add("dark")
      } else {
        document.body.classList.remove("dark")
      }

      return newMode
    })
  }

  const addLanguage = () => {
    setCvData((prev) => ({
      ...prev,
      languages: [...prev.languages, { id: Date.now(), name: "", level: "" }],
    }))
  }

  const addSkill = () => {
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: "", level: "" }],
    }))
  }

  const removeSection = (id) => {
    setCvData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }))
  }

  const handleChange = (id, value) => {
    setCvData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === id ? { ...section, content: value } : section)),
    }))
  }

  const handleNameChange = (e) => {
    setCvData((prev) => ({ ...prev, name: e.target.value }))
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    let y = 20

    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text(cvData.name || "Mi CV", 10, y)
    y += 10

    doc.setFont("helvetica", "normal")
    doc.setFontSize(14)

    cvData.sections.forEach((section) => {
      if (section.content) {
        y += 10
        doc.setFont("helvetica", "bold")
        doc.text(section.title, 10, y)
        y += 5
        doc.setFont("helvetica", "normal")
        const splitContent = doc.splitTextToSize(section.content, 180)
        doc.text(splitContent, 10, y)
        y += splitContent.length * 7
      }
    })

    if (cvData.languages.length > 0) {
      y += 10
      doc.setFont("helvetica", "bold")
      doc.text("Idiomas", 10, y)
      y += 5
      doc.setFont("helvetica", "normal")
      cvData.languages.forEach((language) => {
        doc.text(`${language.name} - ${language.level}`, 10, y)
        y += 7
      })
    }

    if (cvData.skills.length > 0) {
      y += 10
      doc.setFont("helvetica", "bold")
      doc.text("Habilidades", 10, y)
      y += 5
      doc.setFont("helvetica", "normal")
      cvData.skills.forEach((skill) => {
        doc.text(`${skill.name} - Nivel: ${skill.level}%`, 10, y)
        y += 7
      })
    }

    doc.save("mi_cv.pdf")
  }

  const handleLanguageChange = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((language) => (language.id === id ? { ...language, [field]: value } : language)),
    }))
  }

  const handleSkillChange = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeLanguage = (id) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((language) => language.id !== id),
    }))
  }

  const removeSkill = (id) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
      <div className="sticky top-0 z-50">
        <header className="shadow-md w-full bg-white/80 backdrop-blur-lg dark:bg-gray-900/90 dark:backdrop-blur-lg dark:text-white border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600 dark:text-purple-400"
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
              <Link
                to="/"
                className="text-xl font-bold text-purple-600 dark:text-purple-400 relative flex justify-center items-center"
              >
                CVMaker
                <div className="text-white px-1 mx-0.5 text-sm text-center bg-red-700 rounded-3xl flex justify-center items-center absolute -right-16">
                  Beta
                  <IoAlertCircleSharp className="text-white justify-center flex items-center" />
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6 dark:text-white" />
              </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Características
              </a>
              <Link
                to="/templates"
                className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Plantillas
              </Link>
              <a
                href="#testimonials"
                className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Testimonios
              </a>
              <button
                onClick={downloadPDF}
                className="cursor-pointer flex items-center justify-between text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Descargar CV
                <Download className="ml-2 h-4 w-4" />
              </button>
            </nav>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <div className="container mx-auto px-4 py-2">
                <nav className="flex flex-col space-y-2">
                  <a
                    href="#features"
                    className="py-2 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Características
                  </a>
                  <a
                    href="#templates"
                    className="py-2 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Plantillas
                  </a>
                  <a
                    href="#testimonials"
                    className="py-2 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Testimonios
                  </a>
                  <button
                    onClick={downloadPDF}
                    className="cursor-pointer flex items-center justify-between text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-700 dark:hover:bg-purple-600"
                  >
                    Descargar CV
                    <Download className="ml-2 h-4 w-4" />
                  </button>
                </nav>
              </div>
            </div>
          )}
        </header>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 dark:bg-gray-800 dark:text-white transition-colors duration-300">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cv-name" className="block text-xl font-medium text-gray-700 dark:text-gray-300">
                    Nombre del CV
                  </label>
                  <input
                    type="text"
                    id="cv-name"
                    value={cvData.name}
                    onChange={handleNameChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Mi CV Profesional"
                  />
                </div>

                {cvData.sections.map((section) => (
                  <div
                    key={section.id}
                    className="space-y-2 bg-gray-50 p-4 rounded-lg dark:bg-gray-700 transition-colors duration-300"
                  >
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
                        className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:border-purple-500 focus:ring-0 outline-none dark:text-white dark:border-gray-600"
                      />
                      <button
                        onClick={() => removeSection(section.id)}
                        className="cursor-pointer text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        aria-label="Eliminar sección"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <textarea
                      value={section.content}
                      onChange={(e) => handleChange(section.id, e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none dark:bg-gray-600 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      placeholder={`Describe tu ${section.title.toLowerCase()}...`}
                    />
                  </div>
                ))}

                <div>
                  <h3 className="text-xl font-semibold my-2 text-gray-800 dark:text-white">Idiomas</h3>
                  {cvData.languages.map((language) => (
                    <div key={language.id} className="flex gap-4 items-center mb-2">
                      <input
                        type="text"
                        value={language.name}
                        onChange={(e) => handleLanguageChange(language.id, "name", e.target.value)}
                        placeholder="Idioma"
                        className="w-full p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                      <input
                        type="text"
                        value={language.level}
                        onChange={(e) => handleLanguageChange(language.id, "level", e.target.value)}
                        placeholder="Nivel"
                        className="w-full p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                      <button
                        onClick={() => removeLanguage(language.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 transition-colors"
                        aria-label="Eliminar idioma"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addLanguage}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Idioma
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-semibold my-2 text-gray-800 dark:text-white">Habilidades</h3>
                  {cvData.skills.map((skill) => (
                    <div key={skill.id} className="flex gap-4 mb-2 items-center">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(skill.id, "name", e.target.value)}
                        placeholder="Habilidad"
                        className="w-full p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) => handleSkillChange(skill.id, "level", e.target.value)}
                        placeholder="Nivel (0-100)"
                        className="w-full p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 transition-colors"
                        aria-label="Eliminar habilidad"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSkill}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Habilidad
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 dark:bg-gray-800 dark:text-white transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Acciones</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={downloadPDF}
                  className="cursor-pointer flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:text-white transition-colors duration-300">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Vista Previa</h2>
              <div className="space-y-6 p-4 border border-gray-200 rounded-lg min-h-[600px] dark:border-gray-700 dark:bg-gray-50">
                {cvData.name && <h1 className="text-3xl font-bold text-gray-900 ">{cvData.name}</h1>}
                {cvData.sections.map(
                  (section) =>
                    section.content && (
                      <div key={section.id} className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800 ">{section.title}</h3>
                        <p className="text-gray-600  whitespace-pre-line">{section.content}</p>
                      </div>
                    ),
                )}

                {cvData.languages.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Idiomas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {cvData.languages.map((language) => (
                        <div key={language.id} className="flex justify-between">
                          <span className="font-medium dark:text-gray-300">{language.name}</span>
                          <span className="text-gray-600 dark:text-gray-400">{language.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.skills.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Habilidades</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {cvData.skills.map((skill) => (
                        <div key={skill.id} className="flex justify-between">
                          <span className="font-medium dark:text-gray-300">{skill.name}</span>
                          <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
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


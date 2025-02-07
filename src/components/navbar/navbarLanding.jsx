import { useState } from 'react';
import {Link} from 'react-router-dom';

export default function NavbarLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return(
    <div className='sticky top-0 z-50'>
      <header className="shadow-black/10 shadow-md w-full  bg-white/80 backdrop-blur-lg">
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
            <Link to="/" className="text-xl font-bold text-purple-600">CVMaker</Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-purple-600">
              Características
            </a>
            <Link to="/templates" className="text-sm font-medium hover:text-purple-600">
              Plantillas
            </Link>
            <a href="#testimonials" className="text-sm font-medium hover:text-purple-600">
              Testimonios
            </a>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Crear CV Gratis
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-2">
                <a href="#features" className="py-2 text-sm font-medium hover:text-purple-600">
                  Características
                </a>
                <a href="#templates" className="py-2 text-sm font-medium hover:text-purple-600">
                  Plantillas
                </a>
                <a href="#testimonials" className="py-2 text-sm font-medium hover:text-purple-600">
                  Testimonios
                </a>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Crear CV Gratis
                </button>
              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
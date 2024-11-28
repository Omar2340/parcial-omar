import { GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-100 to-orange-50 shadow-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-3">
          <GraduationCap className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Formulario de Inscripción
          </h1>
        </div>
        <p className="text-center mt-2 text-gray-600">Comienza tu futuro académico con nosotros</p>
      </div>
    </header>
  );
}
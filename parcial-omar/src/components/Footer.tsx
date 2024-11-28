import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-100 to-orange-50 border-t border-orange-200">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600">
        <div className="flex items-center justify-center space-x-2">
          <p>Hecho con</p>
          <Heart className="w-4 h-4 text-orange-500" />
          <p>© 2024 Formulario de Inscripción</p>
        </div>
      </div>
    </footer>
  );
}
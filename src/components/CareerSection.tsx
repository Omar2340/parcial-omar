import { useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

interface CareerSectionProps {
  onNext: () => void;
}

export default function CareerSection({ onNext }: CareerSectionProps) {
  const [selectedCareer, setSelectedCareer] = useState('');

  const handleNext = () => {
    if (selectedCareer === '') {
      alert('Por favor, seleccione una carrera antes de continuar.');
      return;
    }
    onNext();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 border border-orange-100">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="w-6 h-6 text-orange-500" />
        <legend className="text-xl font-semibold text-gray-900">
          ¿En qué carrera desea inscribirse?
        </legend>
      </div>
      
      <select 
        name="carrera" 
        required
        value={selectedCareer}
        onChange={(e) => setSelectedCareer(e.target.value)}
        className="block w-full rounded-lg border-orange-200 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 py-3 px-4 mb-6"
      >
        <option value="">Seleccione una carrera</option>
        <option value="administracion">Administración de Empresas</option>
        <option value="bacteriologia">Bacteriología</option>
        <option value="contaduria">Contaduría Pública</option>
        <option value="derecho">Derecho</option>
        <option value="enfermeria">Enfermería</option>
        <option value="ingenieria_sistemas">Ingeniería de Sistemas</option>
        <option value="instrumentacion">Instrumentación Quirúrgica</option>
        <option value="educacion_infantil">Educación Infantil</option>
        <option value="medicina">Medicina</option>
        <option value="odontologia">Odontología</option>
        <option value="prehospitalaria">Tecnología en Atención Prehospitalaria</option>
        <option value="estetica">Tecnología en Estética y Cosmetología</option>
        <option value="mecanica_dental">Tecnología en Mecánica Dental</option>
        <option value="trabajo_social">Trabajo Social</option>
      </select>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Siguiente
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
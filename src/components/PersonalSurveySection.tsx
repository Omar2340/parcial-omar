import { useState } from 'react';
import { Users, ChevronLeft, BriefcaseIcon } from 'lucide-react';

interface PersonalSurveySectionProps {
  onBack: () => void;
  onFormSubmit: () => void; // Agregado para manejar el redireccionamiento a la página principal
}

export default function PersonalSurveySection({ onBack, onFormSubmit }: PersonalSurveySectionProps) {
  const [selectedDiscapacidad, setSelectedDiscapacidad] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const radioClasses = "h-5 w-5 border-orange-200 text-orange-500 focus:ring-orange-500";
  const labelClasses = "ml-3 block text-sm font-medium text-gray-700";

  const handleDiscapacidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDiscapacidad(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevenir comportamiento por defecto del formulario
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onFormSubmit(); // Llama a la función para redirigir a la página principal
    }, 2000); // Mensaje de éxito mostrado por 2 segundos
  };

  return (
    <div className="space-y-6">
      {formSubmitted ? (
        <div className="bg-green-100 p-4 border border-green-200 rounded-md text-green-800">
          <p className="text-center font-medium">Formulario enviado</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-lg rounded-lg p-8 border border-orange-100">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-6 h-6 text-orange-500" />
              <legend className="text-xl font-semibold text-gray-900">
                Información Familiar
              </legend>
            </div>

            <div className="space-y-4">
              {[
                { value: 'no_tengo', label: 'No tengo' },
                { value: '1_hijo', label: '1 hijo' },
                { value: '2_hijos', label: '2 hijos' },
                { value: '3_hijos', label: '3 hijos' },
                { value: 'mas_de_4_hijos', label: 'Más de 4 hijos' }
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`hijos_${option.value}`}
                    name="hijos"
                    value={option.value}
                    required
                    className={radioClasses}
                  />
                  <label htmlFor={`hijos_${option.value}`} className={labelClasses}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 border border-orange-100">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-6 h-6 text-orange-500" />
              <legend className="text-xl font-semibold text-gray-900">
                Información Poblacional
              </legend>
            </div>

            <div className="space-y-4">
              {[
                { value: 'ninguna', label: 'Ninguna' },
                { value: 'indigena', label: 'Indígena' },
                { value: 'afrocolombianos', label: 'Afrocolombianos' },
                { value: 'raizales', label: 'Raizales' },
                { value: 'pueblo_rom', label: 'Pueblo ROM o Gitano' }
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`poblacion_${option.value}`}
                    name="poblacion"
                    value={option.value}
                    required
                    className={radioClasses}
                  />
                  <label htmlFor={`poblacion_${option.value}`} className={labelClasses}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 border border-orange-100">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-6 h-6 text-orange-500" />
              <legend className="text-xl font-semibold text-gray-900">
                Información de Discapacidad
              </legend>
            </div>

            <div className="space-y-4">
              {[
                { value: 'ninguna', label: 'Ninguna' },
                { value: 'motriz', label: 'Discapacidad Motriz' },
                { value: 'sorda', label: 'Discapacidad Sorda' },
                { value: 'cognitiva', label: 'Discapacidad Cognitiva' },
                { value: 'sordo_cego', label: 'Sordo Ceguera' },
                { value: 'trastorno', label: 'Trastorno de la voz y el habla' },
                { value: 'otra', label: 'Otra' }
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`discapacidad_${option.value}`}
                    name="discapacidad"
                    value={option.value}
                    required
                    className={radioClasses}
                    onChange={handleDiscapacidadChange}
                  />
                  <label htmlFor={`discapacidad_${option.value}`} className={labelClasses}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>

            {selectedDiscapacidad === 'otra' && (
              <div className="mt-4">
                <label htmlFor="discapacidadEspecifica" className="block text-sm font-medium text-gray-700">
                  ¿Cuál es su discapacidad?
                </label>
                <input
                  type="text"
                  id="discapacidadEspecifica"
                  name="discapacidadEspecifica"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Especifique"
                />
              </div>
            )}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 border border-orange-100">
            <div className="flex items-center space-x-3 mb-6">
              <BriefcaseIcon className="w-6 h-6 text-orange-500" />
              <legend className="text-xl font-semibold text-gray-900">
                Información Laboral
              </legend>
            </div>

            <div className="space-y-4">
              {[
                { value: 'no_trabajo', label: 'No estoy trabajando' },
                { value: 'empleado', label: 'Sí, soy empleado' },
                { value: 'independiente', label: 'Sí, soy independiente' }
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`trabajo_${option.value}`}
                    name="trabajo"
                    value={option.value}
                    required
                    className={radioClasses}
                  />
                  <label htmlFor={`trabajo_${option.value}`} className={labelClasses}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center rounded-lg border border-orange-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Enviar Formulario
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

import { useState } from 'react';
import { User, ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react';

interface PersonalInfoSectionProps {
  onBack: () => void;
  onNext: () => void;
}

export default function PersonalInfoSection({ onBack, onNext }: PersonalInfoSectionProps) {
  const [formData, setFormData] = useState({
    tipoDocumento: '',
    sexo: '',
    estadoCivil: ''
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClasses = "mt-1 block w-full rounded-lg border-orange-200 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50";
  const labelClasses = "block text-sm font-medium text-gray-700";

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-orange-100">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-6 h-6 text-orange-500" />
          <legend className="text-xl font-semibold text-gray-900">
            Información Personal
          </legend>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className={labelClasses}>
              Primer Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="segundo_nombre" className={labelClasses}>
              Segundo Nombre
            </label>
            <input
              type="text"
              id="segundo_nombre"
              name="segundo_nombre"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="primer_apellido" className={labelClasses}>
              Primer Apellido
            </label>
            <input
              type="text"
              id="primer_apellido"
              name="primer_apellido"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="segundo_apellido" className={labelClasses}>
              Segundo Apellido
            </label>
            <input
              type="text"
              id="segundo_apellido"
              name="segundo_apellido"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="fecha_nacimiento" className={labelClasses}>
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              required
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 border border-orange-100">
        <div className="flex items-center space-x-3 mb-6">
          <Mail className="w-6 h-6 text-orange-500" />
          <legend className="text-xl font-semibold text-gray-900">
            Datos de Contacto
          </legend>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="tipo_documento" className={labelClasses}>
              Tipo de Documento
            </label>
            <select
              id="tipo_documento"
              name="tipoDocumento"
              required
              value={formData.tipoDocumento}
              onChange={handleSelectChange}
              className={inputClasses}
            >
              <option value="">Seleccione un tipo de documento</option>
              <option value="cedula">Cédula de Ciudadanía</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="tarjeta_identidad">Tarjeta de Identidad</option>
              <option value="cedula_extranjeria">Cédula de Extranjería</option>
            </select>
          </div>

          <div>
            <label htmlFor="numero_documento" className={labelClasses}>
              Número de Documento
            </label>
            <input
              type="text"
              id="numero_documento"
              name="numero_documento"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="sexo" className={labelClasses}>
              Sexo Biológico
            </label>
            <select
              id="sexo"
              name="sexo"
              required
              value={formData.sexo}
              onChange={handleSelectChange}
              className={inputClasses}
            >
              <option value="">Seleccione su sexo biológico</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="estado_civil" className={labelClasses}>
              Estado Civil
            </label>
            <select
              id="estado_civil"
              name="estadoCivil"
              required
              value={formData.estadoCivil}
              onChange={handleSelectChange}
              className={inputClasses}
            >
              <option value="">Seleccione su estado civil</option>
              <option value="soltero">Soltero</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
              <option value="viudo">Viudo</option>
              <option value="union_libre">Unión Libre</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                className={inputClasses}
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="telefono" className={labelClasses}>
              Número de Teléfono
            </label>
            <div className="relative">
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                className={inputClasses}
              />
              <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="celular" className={labelClasses}>
              Número de Celular
            </label>
            <div className="relative">
              <input
                type="tel"
                id="celular"
                name="celular"
                required
                className={inputClasses}
              />
              <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
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
          type="button"
          onClick={onNext}
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Siguiente
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { User, ChevronLeft, ChevronRight, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

interface PersonalInfoSectionProps {
  onBack: () => void;
  onNext: () => void;
}

export default function PersonalInfoSection({ onBack, onNext }: PersonalInfoSectionProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    tipoDocumento: '',
    numeroDocumento: '',
    sexo: '',
    estadoCivil: '',
    email: '',
    telefono: '',
    celular: '',
    pais: '',
    ciudad: '',
    direccion: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    numeroDocumento: '',
    telefono: '',
    celular: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validación de solo letras para campos específicos
    if (['nombre', 'segundoNombre', 'primerApellido', 'segundoApellido'].includes(name)) {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'En este campo solo se permiten letras.',
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          [name]: '',
        }));
      }
    }

    // Validación de solo números para campos específicos
    if (['numeroDocumento', 'telefono', 'celular'].includes(name)) {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'En este campo solo se permiten números.',
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          [name]: '',
        }));
      }
    }

    // Verificar si todos los campos son válidos para activar el botón "Siguiente"
    validateForm();
  };

  const validateForm = () => {
    const requiredFields = [
      'nombre', 'primerApellido', 'fechaNacimiento', 'tipoDocumento',
      'numeroDocumento', 'sexo', 'email', 'telefono', 'pais', 'ciudad', 'direccion'
    ];

    const isFormValid = requiredFields.every(field => {
      return (
        !isFieldInvalid(field) &&
        !errors[field] &&
        (field !== 'nombre' && field !== 'segundoNombre' && field !== 'primerApellido' && field !== 'segundoApellido' ? true : /^[A-Za-z\s]*$/.test(formData[field])) &&
        (field !== 'numeroDocumento' && field !== 'telefono' && field !== 'celular' ? true : /^[0-9]*$/.test(formData[field]))
      );
    });

    setIsFormValid(isFormValid);
  };

  const isFieldInvalid = (fieldName: string) => !formData[fieldName]?.trim();
  const inputClasses =
    'mt-1 block w-full rounded-lg border-orange-200 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50';
  const labelClasses = 'block text-sm font-medium text-gray-700';

  return (
    <div className="space-y-6">
      {/* Grupo: Información Personal */}
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
              Primer Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ejemplo-Omar"
              className={`${inputClasses} ${isFieldInvalid('nombre') ? 'border-red-500' : ''}`}
              value={formData.nombre}
              onChange={handleInputChange}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <label htmlFor="segundoNombre" className={labelClasses}>
              Segundo Nombre (Opcional)
            </label>
            <input
              type="text"
              id="segundoNombre"
              name="segundoNombre"
              placeholder="Ejemplo-David"
              className={inputClasses}
              value={formData.segundoNombre}
              onChange={handleInputChange}
            />
            {errors.segundoNombre && <p className="text-red-500 text-xs mt-1">{errors.segundoNombre}</p>}
          </div>
          <div>
            <label htmlFor="primerApellido" className={labelClasses}>
              Primer Apellido <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="primerApellido"
              name="primerApellido"
              placeholder="Ejemplo-Fuertes"
              className={`${inputClasses} ${isFieldInvalid('primerApellido') ? 'border-red-500' : ''}`}
              value={formData.primerApellido}
              onChange={handleInputChange}
            />
            {errors.primerApellido && <p className="text-red-500 text-xs mt-1">{errors.primerApellido}</p>}
          </div>
          <div>
            <label htmlFor="segundoApellido" className={labelClasses}>
              Segundo Apellido (Opcional)
            </label>
            <input
              type="text"
              id="segundoApellido"
              name="segundoApellido"
              placeholder="Ejejemplo-García"
              className={inputClasses}
              value={formData.segundoApellido}
              onChange={handleInputChange}
            />
            {errors.segundoApellido && <p className="text-red-500 text-xs mt-1">{errors.segundoApellido}</p>}
          </div>
          <div>
            <label htmlFor="fechaNacimiento" className={labelClasses}>
              Fecha de Nacimiento <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              className={`${inputClasses} ${isFieldInvalid('fechaNacimiento') ? 'border-red-500' : ''}`}
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="tipoDocumento" className={labelClasses}>
              Tipo de Documento <span className="text-red-500">*</span>
            </label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              className={`${inputClasses} ${isFieldInvalid('tipoDocumento') ? 'border-red-500' : ''}`}
              value={formData.tipoDocumento}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Licencia de conducción">Licencia de conducción</option>
            </select>
          </div>
          <div>
            <label htmlFor="numeroDocumento" className={labelClasses}>
              Número de Documento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              placeholder="Ejemplo-1054836222"
              className={`${inputClasses} ${isFieldInvalid('numeroDocumento') ? 'border-red-500' : ''}`}
              value={formData.numeroDocumento}
              onChange={handleInputChange}
            />
            {errors.numeroDocumento && <p className="text-red-500 text-xs mt-1">{errors.numeroDocumento}</p>}
          </div>
          <div>
            <label htmlFor="sexo" className={labelClasses}>
              Sexo Biológico <span className="text-red-500">*</span>
            </label>
            <select
              id="sexo"
              name="sexo"
              className={`${inputClasses} ${isFieldInvalid('sexo') ? 'border-red-500' : ''}`}
              value={formData.sexo}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="estadoCivil" className={labelClasses}>
              Estado Civil <span className="text-red-500">*</span>
            </label>
            <select
              id="estadoCivil"
              name="estadoCivil"
              className={`${inputClasses} ${isFieldInvalid('estadoCivil') ? 'border-red-500' : ''}`}
              value={formData.estadoCivil}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="soltero(a)">Soltero/a</option>
              <option value="casado(a)">Casado/a</option>
              <option value="divorciado(a)">Divorciado/a</option>
              <option value="viudo(a)">Viudo/a</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className={labelClasses}>
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ejemplo-omardfg@dominio.com"
              className={`${inputClasses} ${isFieldInvalid('email') ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="telefono" className={labelClasses}>
              Número de Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              placeholder="Ejemplo-310 320 1019"
              className={`${inputClasses} ${isFieldInvalid('telefono') ? 'border-red-500' : ''}`}
              value={formData.telefono}
              onChange={handleInputChange}
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>
          <div>
            <label htmlFor="celular" className={labelClasses}>
              Número de Celular <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="celular"
              name="celular"
              placeholder="Ejemplo-321 322 7778"
              className={`${inputClasses} ${isFieldInvalid('celular') ? 'border-red-500' : ''}`}
              value={formData.celular}
              onChange={handleInputChange}
            />
            {errors.celular && <p className="text-red-500 text-xs mt-1">{errors.celular}</p>}
          </div>
        </div>
      </div>

      {/* Grupo: Dirección Residencial */}
      <div className="bg-white shadow-lg rounded-lg p-8 border border-orange-100">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="w-6 h-6 text-orange-500" />
          <legend className="text-xl font-semibold text-gray-900">
            Dirección Residencial
          </legend>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="pais" className={labelClasses}>
              País <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pais"
              name="pais"
              placeholder="Ejemplo-Colombia"
              className={`${inputClasses} ${isFieldInvalid('pais') ? 'border-red-500' : ''}`}
              value={formData.pais}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="ciudad" className={labelClasses}>
              Ciudad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              placeholder="Ejemplo-Cartagena"
              className={`${inputClasses} ${isFieldInvalid('ciudad') ? 'border-red-500' : ''}`}
              value={formData.ciudad}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="direccion" className={labelClasses}>
              Dirección <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Ej Carrera 10 #2-7"
              className={`${inputClasses} ${isFieldInvalid('direccion') ? 'border-red-500' : ''}`}
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-lg border border-orange-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver
        </button>
        <button
          type="button"
          onClick={() => {
            if (isFormValid) {
              onNext();
            } else {
              alert('Por favor complete todos los campos correctamente.');
            }
          }}
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          disabled={!isFormValid}
        >
          Siguiente
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

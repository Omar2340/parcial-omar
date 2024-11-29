import { useState } from 'react'; 
import { User, ChevronLeft, ChevronRight } from 'lucide-react';

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
    fechaNacimiento: '',
    tipoDocumento: '',
    sexo: '',
    email: '',
    pais: '',
    ciudad: '',
    direccion: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Validación específica de campos con restricciones de caracteres
    if (name === 'nombre' || name === 'segundoNombre' || name === 'primerApellido' || name === 'segundoApellido') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return; // No permite caracteres no permitidos
      }
    } else if (name === 'numeroDocumento') {
      if (!/^[0-9\s]*$/.test(value)) {
        return; // No permite letras en el número de documento
      }
    } else if (name === 'telefono' || name === 'celular') {
      if (!/^[\+\-\d\s]*$/.test(value)) {
        return; // Permite números, espacios, + y -
      }
    } else if (name === 'pais' || name === 'ciudad') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return; // No permite números en estos campos
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Solo valida los campos si se presionó el botón de "Siguiente"
    if (errors[name]) {
      validateField(name);
    }
  };

  const validateField = (fieldName: string) => {
    let error = '';
    if (!formData[fieldName]?.trim()) {
      error = 'Este campo es obligatorio.';
    } else {
      switch (fieldName) {
        case 'fechaNacimiento':
          const date = new Date(formData[fieldName]);
          const today = new Date();
  
          // Verifica si la fecha es válida y no es futura
          if (isNaN(date.getTime())) {
            error = 'Ingrese una fecha válida.';
          } else if (date > today) {
            error = 'La fecha de nacimiento no puede ser futura.';
          }
          break;
  
        // Validación de caracteres para otros campos
        case 'pais':
        case 'ciudad':
          if (!/^[a-zA-Z\s]*$/.test(formData[fieldName])) {
            error = 'Solo se permiten letras y espacios.';
          }
          break;
  
        case 'telefono':
        case 'celular':
          if (!/^[\+\-\d\s]*$/.test(formData[fieldName])) {
            error = 'Solo se permiten números, espacios, + y -.';
          }
          break;
  
        default:
          break;
      }
    }
  
    setErrors(prev => ({
      ...prev,
      [fieldName]: error,
    }));
  };
  

  const handleNext = () => {
    const requiredFields = [
      'nombre',
      'primerApellido',
      'numeroDocumento',
      'fechaNacimiento',
      'tipoDocumento',
      'sexo',
      'email',
      'celular',
      'pais',
      'ciudad',
      'direccion'
    ];

    let isValid = true;
    let newErrors = { ...errors };

    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'Este campo es obligatorio.';
        isValid = false;
      } else {
        // Validación de caracteres en campos específicos
        if (
          (field === 'pais' || field === 'ciudad') && !/^[a-zA-Z\s]*$/.test(formData[field])
        ) {
          newErrors[field] = 'Solo se permiten letras y espacios.';
          isValid = false;
        }
        if (
          (field === 'telefono' || field === 'celular') && !/^[\+\-\d\s]*$/.test(formData[field])
        ) {
          newErrors[field] = 'Solo se permiten números, espacios, + y -.';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);

    if (isValid) {
      onNext();
    } else {
      alert('Por favor, complete todos los campos obligatorios correctamente.');
    }
  };

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
          {/* Campos de formulario */}
          <div>
            <label htmlFor="nombre" className={labelClasses}>
              Primer Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"

              placeholder="Ejemplo Omar"
              className={`${inputClasses} ${errors.nombre ? 'border-red-500' : ''}`}

              value={formData.nombre}
              onChange={handleInputChange}
              onBlur={() => validateField('nombre')}
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

              placeholder="Ejemplo David"

              className={inputClasses}
              value={formData.segundoNombre}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="primerApellido" className={labelClasses}>
              Primer Apellido <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="primerApellido"
              name="primerApellido"

              placeholder="Ejemplo Fuertes"
              className={`${inputClasses} ${errors.primerApellido ? 'border-red-500' : ''}`}

              value={formData.primerApellido}
              onChange={handleInputChange}
              onBlur={() => validateField('primerApellido')}
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

              placeholder="Ejemplo García"

              className={inputClasses}
              value={formData.segundoApellido}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="fechaNacimiento" className={labelClasses}>
              Fecha de Nacimiento <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              className={`${inputClasses} ${errors.fechaNacimiento ? 'border-red-500' : ''}`}
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              onBlur={() => validateField('fechaNacimiento')}
            />
            {errors.fechaNacimiento && <p className="text-red-500 text-xs mt-1">{errors.fechaNacimiento}</p>}
          </div>
          <div>
            <label htmlFor="tipoDocumento" className={labelClasses}>
              Tipo de Documento <span className="text-red-500">*</span>
            </label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              className={`${inputClasses} ${errors.tipoDocumento ? 'border-red-500' : ''}`}
              value={formData.tipoDocumento}
              onChange={handleInputChange}
              onBlur={() => validateField('tipoDocumento')}
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Licencia de conducción">Licencia de conducción</option>
            </select>
            {errors.tipoDocumento && <p className="text-red-500 text-xs mt-1">{errors.tipoDocumento}</p>}
          </div>
          <div>
            <label htmlFor="numeroDocumento" className={labelClasses}>
              Número de Documento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"

              placeholder="Ejemplo 105456789"
              className={`${inputClasses} ${errors.numeroDocumento ? 'border-red-500' : ''}`}

              value={formData.numeroDocumento}
              onChange={handleInputChange}
              onBlur={() => validateField('numeroDocumento')}
            />
            {errors.numeroDocumento && <p className="text-red-500 text-xs mt-1">{errors.numeroDocumento}</p>}
          </div>
          <div>
            <label htmlFor="sexo" className={labelClasses}>
              Sexo <span className="text-red-500">*</span>
            </label>
            <select
              id="sexo"
              name="sexo"
              className={`${inputClasses} ${errors.sexo ? 'border-red-500' : ''}`}
              value={formData.sexo}
              onChange={handleInputChange}
              onBlur={() => validateField('sexo')}
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.sexo && <p className="text-red-500 text-xs mt-1">{errors.sexo}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"

              placeholder="Ejemplo omar@dominio.com"
              className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}

              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => validateField('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="telefono" className={labelClasses}>
              Teléfono (Opcional)
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Ejemplo +57 123456789"
              className={`${inputClasses} ${errors.telefono ? 'border-red-500' : ''}`}

              value={formData.telefono}
              onChange={handleInputChange}
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>
          <div>
            <label htmlFor="celular" className={labelClasses}>
              Celular <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="celular"
              name="celular"
              placeholder="Ejemplo +57 123456789"
              className={`${inputClasses} ${errors.celular ? 'border-red-500' : ''}`}
              value={formData.celular}
              onChange={handleInputChange}
              onBlur={() => validateField('celular')}
            />
            {errors.celular && <p className="text-red-500 text-xs mt-1">{errors.celular}</p>}
          </div>
          <div>
            <label htmlFor="pais" className={labelClasses}>
              País <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pais"
              name="pais"
              placeholder="Ejemplo Colombia"
              className={`${inputClasses} ${errors.pais ? 'border-red-500' : ''}`}
              value={formData.pais}
              onChange={handleInputChange}
              onBlur={() => validateField('pais')}
            />
            {errors.pais && <p className="text-red-500 text-xs mt-1">{errors.pais}</p>}
          </div>
          <div>
            <label htmlFor="ciudad" className={labelClasses}>
              Ciudad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              placeholder="Ejemplo Cartagena"
              className={`${inputClasses} ${errors.ciudad ? 'border-red-500' : ''}`}
              value={formData.ciudad}
              onChange={handleInputChange}
              onBlur={() => validateField('ciudad')}
            />
            {errors.ciudad && <p className="text-red-500 text-xs mt-1">{errors.ciudad}</p>}
          </div>
          <div>
            <label htmlFor="direccion" className={labelClasses}>
              Dirección <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Ejemplo Barrio Villa Grande 2 Calle 11 #3, lote 10"
              className={`${inputClasses} ${errors.direccion ? 'border-red-500' : ''}`}
              value={formData.direccion}
              onChange={handleInputChange}
              onBlur={() => validateField('direccion')}
            />
            {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="h-4 w-4" /> Volver
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Siguiente <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

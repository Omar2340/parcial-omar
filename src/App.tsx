import { useState } from 'react';
import CareerSection from './components/CareerSection';
import PersonalInfoSection from './components/PersonalInfoSection';
import PersonalSurveySection from './components/PersonalSurveySection';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [currentSection, setCurrentSection] = useState('career');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');

    // Mostrar un mensaje de éxito
    alert('Formulario enviado con éxito');

    // Redirigir a la página principal después de que el usuario presione "Aceptar"
    setTimeout(() => {
      setCurrentSection('career');
    }, 1000); // 1000 ms = 1 segundo de espera antes de redirigir
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {currentSection === 'career' && (
            <CareerSection onNext={() => setCurrentSection('personal')} />
          )}
          
          {currentSection === 'personal' && (
            <PersonalInfoSection 
              onBack={() => setCurrentSection('career')}
              onNext={() => setCurrentSection('survey')}
            />
          )}
          
          {currentSection === 'survey' && (
            <PersonalSurveySection 
              onBack={() => setCurrentSection('personal')}
            />
          )}
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Header } from './components/Header';
import { NavigationCards } from './components/NavigationCards';
import { ReagentManagement } from './components/modules/ReagentManagement';
import { SampleLibrary } from './components/modules/SampleLibrary';
import { LibraryPreparation } from './components/modules/LibraryPreparation';
import { SequencingManagement } from './components/modules/SequencingManagement';
import { DataAnalysis } from './components/modules/DataAnalysis';
import { SettingsPanel } from './components/SettingsPanel';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [activeModule, setActiveModule] = useState('reagent-management');
  const [showSettings, setShowSettings] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'reagent-management':
        return <ReagentManagement />;
      case 'sample-library':
        return <SampleLibrary />;
      case 'library-preparation':
        return <LibraryPreparation />;
      case 'sequencing-management':
        return <SequencingManagement />;
      case 'data-analysis':
        return <DataAnalysis />;
      default:
        return <ReagentManagement />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <Header onSettingsClick={() => setShowSettings(true)} />
          <NavigationCards activeModule={activeModule} onModuleChange={setActiveModule} />
          
          <main className="px-6 pb-6">
            <div className="max-w-7xl mx-auto">
              {renderModule()}
            </div>
          </main>
        </div>

        {/* Settings Panel */}
        <SettingsPanel 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
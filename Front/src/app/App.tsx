import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { NurseDashboard } from './components/NurseDashboard';
import { DirectorDashboard } from './components/DirectorDashboard';
import { HomeView } from './components/HomeView';
import { ScheduleAppointment } from './components/ScheduleAppointment';

export default function App() {
  function handleSelectRole(role: 'director' | 'nurse'): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>

          <Route path="/" element={<HomeView onSelectRole={handleSelectRole} />} />
          <Route path="/nurse" element={<NurseDashboard />} />

          <Route
            path="/director"
            element={<DirectorDashboard />}
          />

          <Route
            path="/schedule"
            element={<ScheduleAppointment />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
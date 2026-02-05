import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { AllPharmacies } from './pages/AllPharmacies';
import { Calendar } from './pages/Calendar';
import { Hospitals, Contact, Blog } from './pages/Reference';
import { Embed } from './pages/Embed';

function App() {
  return (
    <Routes>
      <Route path="/embed" element={<Embed />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nobetci" element={<Navigate to="/" replace />} />
              <Route path="/eczaneler" element={<AllPharmacies />} />
              <Route path="/takvim" element={<Calendar />} />
              <Route path="/hastaneler" element={<Hospitals />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;

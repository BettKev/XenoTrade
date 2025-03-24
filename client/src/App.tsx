import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Roadmap from './pages/Roadmap';
import { LoginProvider } from './contexts/LoginContext';

const App: React.FC = () => {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LoginProvider>
  );
};

export default App;

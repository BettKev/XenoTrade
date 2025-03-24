import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import { LoginProvider } from './contexts/LoginContext';

const App: React.FC = () => {
  return (
    <LoginProvider>
      <Layout>
        <Home />
      </Layout>
    </LoginProvider>
  );
};

export default App;

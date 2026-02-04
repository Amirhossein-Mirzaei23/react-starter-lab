import { useRoutes } from 'react-router-dom';
import routes from './routes/route';
import './App.css';

export const API_URL = import.meta.env.VITE_API_BASE_URL || '';

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;

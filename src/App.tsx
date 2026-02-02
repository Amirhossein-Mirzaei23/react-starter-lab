import { useRoutes } from 'react-router-dom';
import routes from './routes/route';
import './App.css';

export const apiUrl = import.meta.env.VITE_API_BASE_URL
function App() {
  // React Router v6 hook-based routing
  const element = useRoutes(routes);
  return element;
}

export default App;

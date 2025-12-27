import { useRoutes } from 'react-router-dom';
import routes from './routes/route';
import './App.css';
export const apiUrl = 'https://dong-api.liara.run';
// export const apiUrl = 'http://localhost:3000';
function App() {
  // React Router v6 hook-based routing
  const element = useRoutes(routes);
  return element;
}

export default App;

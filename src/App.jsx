import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useFilter } from './hooks/useFilter';
import { AppRoutes } from './AppRoutes';
import Sidebar from './components/Sidebar/Sidebar';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';

function App() {
  // const { activePage, setActivePage } = useFilter();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className={loading ? 'd-flex backgroud-blur' : 'd-flex'}>
        <Sidebar />
        <div className="container-fluid">
          <AppRoutes setLoading={setLoading} />
        </div>
      </div>
      <div
        className={
          loading ? 'animation-in loading-view' : 'animation-out loading-view'
        }
      >
        <p className="loading-text">Cargando datos...</p>
        <CircularProgress />
      </div>
    </>
  );
}

export default App;

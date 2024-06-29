import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AppRoutes } from './AppRoutes';
import Sidebar from './components/Sidebar/Sidebar';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import { useFilter } from './hooks/useFilter';

function App() {

  const { loading, info } = useFilter();


  return (
    <>
      <div className={loading ? 'd-flex background-blur' : 'd-flex'}>
        <Sidebar />
        <div className="container-fluid">
          <AppRoutes />
        </div>
      </div>
      <div
        className={
          loading ? 'animation-in loading-view' : 'animation-out loading-view'
        }
      >
        <p className="loading-text">Cargando datos...</p>
        <p className="loading-info">{info}</p>
        <CircularProgress />
      </div>
    </>
  );
}

export default App;

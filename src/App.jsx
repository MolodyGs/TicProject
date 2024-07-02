import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './components/Sidebar/Sidebar';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import { useFilter } from './hooks/useFilter';
import { Routes, Route } from 'react-router-dom';
import Deposit from './components/Visualization/Deposit';
import Upl from './components/Visualization/UPL';
import Statistics from './components/Statistics/Statistics';

function App() {
  const { loading, info } = useFilter();

  return (
    <>
      <div className={loading ? 'd-flex background-blur' : 'd-flex'}>
        <Sidebar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<h2>Inicio</h2>}></Route>
            <Route path="/deposit" element={<Deposit />}></Route>
            <Route path="/upl" element={<Upl />}></Route>
            <Route path="/stats" element={<Statistics />}></Route>
          </Routes>
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

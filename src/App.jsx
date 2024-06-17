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
      <div
        className="d-flex animation"
        style={
          loading
            ? {
                filter: 'blur(10px) brightness(0.7)',
                pointerEvents: 'none',
                transitionDuration: '0.2s',
                opacity: 0.5,
                backgroundColor: 'rgba(255, 255, 255)',
              }
            : {
                transitionDuration: '0.2s',
                filter: 'brightness(0.9)',
                backgroundColor: 'rgba(255, 255, 255)',
              }
        }
      >
        <Sidebar />
        <div className="container-fluid">
          <AppRoutes setLoading={setLoading} />
        </div>
      </div>
      {loading ? (
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'white',
            boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: 10,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              textAlign: 'center',
              marginBottom: 60,
              color: 'grey',
            }}
          >
            Cargando datos
          </p>
          <CircularProgress />
        </div>
      ) : null}
    </>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useFilter } from './hooks/useFilter';
import { AppRoutes } from './AppRoutes';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const { activePage, setActivePage } = useFilter();

  return (
    <>
      <div className="d-flex">
        <Sidebar setActivePage={setActivePage} />
        <div className="container-fluid">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;

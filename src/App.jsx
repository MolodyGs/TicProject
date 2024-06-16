import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './components/Sidebar/Sidebar';
import { useFilter } from './hooks/useFilter';
import Deposit from './components/Visualization/Deposit';
import UPL from './components/Visualization/UPL';

function App() {
  const { activePage, setActivePage } = useFilter();

  return (
    <div className="d-flex">
      <Sidebar setActivePage={setActivePage} />
      <div className="container-fluid">
        {activePage === 'yacimiento' && <Deposit />}
        {activePage === 'upl' && <UPL />}
      </div>
    </div>
  );
}

export default App;

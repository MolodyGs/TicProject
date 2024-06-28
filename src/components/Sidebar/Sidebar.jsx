import PropTypes from 'prop-types';
import Filters from '../Filters/Filters';
import UplStats from '../UplStats/UplStats';
import { useFilter } from '../../hooks/useFilter';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handle = (route) => {
    navigate('/' + route);
  };

  const { activePage } = useFilter();
  return (
    <div
      className="bg-light border-right"
      id="sidebar-wrapper"
      style={{ minWidth: '250px', fontFamily: 'Arial, sans-serif' }}
    >
      <div className="text-center mt-4">
        <img
          src="https://1000logos.net/wp-content/uploads/2020/07/BHP-Logo.png"
          alt="Logo Minero"
          style={{ width: '100px', height: '50px' }}
        />
      </div>
      <div className="sidebar-heading text-center py-2 primary-text fs-4 fw-bold border-bottom">
        <span>Sistema inteligente para yacimientos mineros</span>
      </div>
      <div className="list-group list-group-flush my-3">
        <a
          href="Deposit"
          className="list-group-item list-group-item-action bg-light text-primary d-flex align-items-center"
          // onClick={() => handle('Desposit')}
        >
          <i className="fas fa-mountain mr-2" />
          <span>Yacimiento</span>
        </a>
        <a
          href="UPL"
          className="list-group-item list-group-item-action bg-light text-primary d-flex align-items-center"
          // onClick={() => handle('UPL')}
        >
          <i className="fas fa-gem mr-2" />
          <span>Ultimate Pit Limit</span>
        </a>
      </div>
      <div className="border-top border-dark pt-4" />
      <div className="mx-4">
        <Filters />
      </div>
      {activePage === 'upl' && (
        <div className="mx-4">
          <UplStats />
        </div>
      )}
    </div>
  );
}

// Sidebar.propTypes = {
//   setActivePage: PropTypes.func.isRequired,
// };

export default Sidebar;
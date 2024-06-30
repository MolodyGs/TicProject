import Filters from '../Filters/Filters';
import UplStats from '../UplStats/UplStats';
import { useFilter } from '../../hooks/useFilter';
import { NavLink } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { useState } from 'react';

function Sidebar() {
  const { activePage, setActivePage } = useFilter();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isUplOpen, setIsUplOpen] = useState(false);

  return (
    <div
      className="bg-light border-right"
      id="sidebar-wrapper"
      style={{
        minWidth: '250px',
        fontFamily: 'Arial, sans-serif',
        height: '100vh',
      }}
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
      <div className="dropdown my-3">
        <button
          className="btn btn-light dropdown-toggle w-100 text-primary d-flex align-items-center justify-content-between"
          onClick={() => setIsNavigationOpen(!isNavigationOpen)}
        >
          <span>Navegación</span>
        </button>
        <div className={`collapse ${isNavigationOpen ? 'show' : ''}`}>
          <ul className="list-group list-group-flush">
            {routes.map((route) => (
              <li
                key={route.id}
                className="list-group-item list-group-item-action bg-light text-primary"
              >
                <NavLink
                  onClick={() => setActivePage(route.helper)}
                  to={route.path}
                  className={({ isActive }) =>
                    ['nav-link', isActive ? 'active' : null].join(' ')
                  }
                >
                  {route.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Línea Divisoria */}

      {/* Dropdown de Filtros (Solo visible en yacimiento y UPL) */}
      {(activePage === 'yacimiento' || activePage === 'upl') && (
        <>
          <div className="border-top border-dark pt-4" />
          <div className="dropdown mx-4">
            <button
              className="btn btn-light dropdown-toggle w-100 text-primary d-flex align-items-center justify-content-between"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <span>Filtros</span>
            </button>
            <div className={`collapse ${isFiltersOpen ? 'show' : ''}`}>
              <Filters />
            </div>
          </div>
        </>
      )}
      {/* Línea Divisoria */}

      {/* Dropdown de UPL Stats (Solo visible en UPL) */}
      {activePage === 'upl' && (
        <>
          <div className="border-top border-dark pt-4" />
          <div className="dropdown mx-4">
            <button
              className="btn btn-light dropdown-toggle w-100 text-primary d-flex align-items-center justify-content-between"
              onClick={() => setIsUplOpen(!isUplOpen)}
            >
              <span>UPL Stats</span>
            </button>
            <div className={`collapse ${isUplOpen ? 'show' : ''}`}>
              <UplStats />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;

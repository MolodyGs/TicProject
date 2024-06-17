import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Deposit from './components/Visualization/Deposit';
import UPL from './components/Visualization/UPL';

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Navigate to="/Deposit" />} />
        <Route exact path="/Deposit" element={<Deposit />} />
        <Route exact path="/UPL" element={<UPL />} />
      </Routes>
    </>
  );
};

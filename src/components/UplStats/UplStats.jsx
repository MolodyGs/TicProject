import React from 'react';
import { useFilter } from '../../hooks/useFilter';

function UplDashboard() {
  const { upl, extractionCost, totalValue } = useFilter();
  return (
    <div className="border-top border-dark pt-4">
      <h4 className="text-center">Panel UPL</h4>
      <p>
        <i className="fas fa-dollar-sign mr-2"></i> UPL:{' '}
        <span
          className={upl !== null && upl < 0 ? 'text-danger' : 'text-success'}
        >
          {upl !== null && typeof upl === 'number'
            ? `${upl.toFixed(2)} USD`
            : 'Cargando...'}
        </span>
      </p>
      <p>
        <i className="fas fa-dollar-sign mr-2"></i> Costo de extracción:{' '}
        <span>
          {extractionCost !== null && typeof extractionCost === 'number'
            ? `${extractionCost.toFixed(2)} USD`
            : 'Cargando...'}
        </span>
      </p>
      <p>
        <i className="fas fa-dollar-sign mr-2"></i> Valor venta total:{' '}
        <span>
          {totalValue !== null && typeof totalValue === 'number'
            ? `${totalValue.toFixed(2)} USD`
            : 'Cargando...'}
        </span>
      </p>
    </div>
  );
}

export default React.memo(UplDashboard);

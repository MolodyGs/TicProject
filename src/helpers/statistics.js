import { EXTRACTION_COST_PER_BLOCK, MINERAL_PRICE } from '../utils/constants';

export const calculateUpl = (data) => {
  let uplValue = -30000000;
  let totalExtractionCost = 30000000;
  let totalValue = 0;
  if (data.length === 0) {
    uplValue = 0;
    totalExtractionCost = 0;
    totalValue = 0;
  }

  data.forEach((cube) => {
    const [x, y, z, weight, mineral1, mineral2] = cube;
    const mineralValue = (mineral1 + mineral2) * MINERAL_PRICE;
    const blockCost = EXTRACTION_COST_PER_BLOCK;

    uplValue += mineralValue - blockCost;
    totalValue += mineralValue;
    totalExtractionCost += blockCost;
  });
  return { uplValue, totalExtractionCost, totalValue };
};

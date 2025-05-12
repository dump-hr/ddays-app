import FloorPlanBase from '@/assets/images/floor-plan-base.svg';
import BoothButton from './BoothButton';

import c from './FloorPlan.module.scss';

type Position = {
  x: number;
  y: number;
};

type BoothWithPosition = {
  boothString: string;
  position: Position;
};

const boothPositions: BoothWithPosition[] = [
  {
    boothString: 'Z1',
    position: { x: 40.5, y: 63 },
  },
  {
    boothString: 'Z2',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'Z3',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S1',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S2',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S3',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S4',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S5',
    position: { x: 39, y: 53 },
  },
  {
    boothString: 'S6',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S7',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S8',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S9',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S10',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S11',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S12',
    position: { x: 0, y: 0 },
  },
  {
    boothString: 'S13',
    position: { x: 0, y: 0 },
  },
];

const FloorPlan = () => {
  return (
    <div className={c.floorPlanWrapper}>
      {boothPositions.map((booth) => (
        <BoothButton
          boothString={booth.boothString}
          position={booth.position}
        />
      ))}
      <img src={FloorPlanBase} alt='' />;
    </div>
  );
};

export default FloorPlan;

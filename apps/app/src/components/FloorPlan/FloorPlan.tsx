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
    position: { x: 40.5, y: 63.3 },
  },
  {
    boothString: 'Z2',
    position: { x: 52.2, y: 63.3 },
  },
  {
    boothString: 'Z3',
    position: { x: 52.2, y: 43 },
  },
  {
    boothString: 'Z4',
    position: { x: 43, y: 31.5 },
  },
  {
    boothString: 'S1',
    position: { x: 59.1, y: 65.1 },
  },
  {
    boothString: 'S2',
    position: { x: 64.6, y: 65.1 },
  },
  {
    boothString: 'S3',
    position: { x: 70, y: 65.1 },
  },
  {
    boothString: 'S4',
    position: { x: 75.4, y: 65.1 },
  },
  {
    boothString: 'S5',
    position: { x: 39, y: 53 },
  },
  {
    boothString: 'S6',
    position: { x: 70, y: 47.5 },
  },
  {
    boothString: 'S7',
    position: { x: 70, y: 40.5 },
  },
  {
    boothString: 'S8',
    position: { x: 59.1, y: 40.5 },
  },
  {
    boothString: 'S9',
    position: { x: 64.6, y: 40.5 },
  },
  {
    boothString: 'S10',
    position: { x: 64.6, y: 47.5 },
  },
  {
    boothString: 'S11',
    position: { x: 59.1, y: 47.5 },
  },
  {
    boothString: 'S12',
    position: { x: 51.6, y: 19.1 },
  },
  {
    boothString: 'S13',
    position: { x: 60.6, y: 19.1 },
  },
];

type FloorPlanProps = {
  onBoothClick: (boothString: string) => void;
};

const FloorPlan: React.FC<FloorPlanProps> = ({ onBoothClick }) => {
  return (
    <div className={c.floorPlanWrapper}>
      {boothPositions.map((booth) => (
        <BoothButton
          boothString={booth.boothString}
          position={booth.position}
          onBoothClick={onBoothClick}
        />
      ))}
      <img src={FloorPlanBase} alt='' />
    </div>
  );
};

export default FloorPlan;

import programerka from '../assets/images/avatars/programerka.png';
import designerica from '../assets/images/avatars/designerica.png';
import marketing from '../assets/images/avatars/marketing.png';
import multimedijasica from '../assets/images/avatars/multimedijasica.png';
import gamerica from '../assets/images/avatars/gamerica.png';
import poduzetnica from '../assets/images/avatars/poduzetnica.png';
import nft from '../assets/images/avatars/nft.png';

//TODO maybe move to some type file
export type DuckObject = {
  imageSrc: string;
  name: string;
  description: string;
};

export const ducks: DuckObject[] = [
  {
    imageSrc: programerka,
    name: 'Programerka',
    description: 'Kamenjarka, ne voli izlazit, prodat ce te za koru kruva',
  },
  {
    imageSrc: designerica,
    name: 'Design(erica)',
    description: 'Profinjenog ukusa, imposter syndrom na max, voli layout',
  },
  {
    imageSrc: marketing,
    name: 'Marketing expert',
    description: 'Triba copy od marketinga max. ovoliko dug, 2 reda',
  },
  {
    imageSrc: multimedijasica,
    name: 'Multimedijašica',
    description: 'Triba copy od marketinga max. ovoliko dug, 2 reda',
  },
  {
    imageSrc: gamerica,
    name: 'Gamerica',
    description: 'Triba copy od marketinga max. ovoliko dug, 2 reda',
  },
  {
    imageSrc: poduzetnica,
    name: 'Poduzetnica',
    description: 'Triba copy od marketinga max. ovoliko dug, 2 reda',
  },
  {
    imageSrc: nft,
    name: 'NFT Slavica',
    description: 'Triba copy od marketinga max. ovoliko dug, 2 reda',
  },
];

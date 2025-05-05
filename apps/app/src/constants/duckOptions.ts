import programerka from '../assets/images/avatars/programerka.png';
import designerica from '../assets/images/avatars/designerica.png';
import marketing from '../assets/images/avatars/marketing.png';
import multimedijasica from '../assets/images/avatars/multimedijasica.png';
import gamerica from '../assets/images/avatars/gamerica.png';
import poduzetnica from '../assets/images/avatars/poduzetnica.png';
import nft from '../assets/images/avatars/nft.png';

import yellow from '../assets/images/avatars/icons/colors/original.png';
import yellowPreview from '../assets/images/avatars/colors/default.png';
import orange from '../assets/images/avatars/icons/colors/orange.png';
import orangePreview from '../assets/images/avatars/colors/orange.png';
import brown from '../assets/images/avatars/icons/colors/brown.png';
import brownPreview from '../assets/images/avatars/colors/brown.png';
import purple from '../assets/images/avatars/icons/colors/purple.png';
import purplePreview from '../assets/images/avatars/colors/purple.png';
import green from '../assets/images/avatars/icons/colors/green.png';
import greenPreview from '../assets/images/avatars/colors/green.png';
import blue from '../assets/images/avatars/icons/colors/blue.png';
import bluePreview from '../assets/images/avatars/colors/blue.png';
import red from '../assets/images/avatars/icons/colors/red.png';
import redPreview from '../assets/images/avatars/colors/red.png';
import gray from '../assets/images/avatars/icons/colors/gray.png';
import grayPreview from '../assets/images/avatars/colors/gray.png';

import angry from '../assets/images/avatars/icons/face/angry.png';
import angryPreview from '../assets/images/avatars/face/angry.png';
import eyelashes from '../assets/images/avatars/icons/face/eyelashes.png';
import eyelashesPreview from '../assets/images/avatars/face/eyelashes.png';
import crying from '../assets/images/avatars/icons/face/crying.png';
import cryingPreview from '../assets/images/avatars/face/crying.png';
import mole from '../assets/images/avatars/icons/face/mole.png';
import molePreview from '../assets/images/avatars/face/mole.png';
import mustache from '../assets/images/avatars/icons/face/mustache.png';
import mustachePreview from '../assets/images/avatars/face/mustache.png';
import noseRing from '../assets/images/avatars/icons/face/nose_ring.png';
import noseRingPreview from '../assets/images/avatars/face/nose_ring.png';
import tattoo from '../assets/images/avatars/icons/face/tattoo.png';
import tattooPreview from '../assets/images/avatars/face/tattoo.png';

import angel from '../assets/images/avatars/icons/accessories/angel.png';
import angelPreview from '../assets/images/avatars/accessories/angel.png';
import beret from '../assets/images/avatars/icons/accessories/beret.png';
import beretPreview from '../assets/images/avatars/accessories/beret.png';
import crown from '../assets/images/avatars/icons/accessories/crown.png';
import crownPreview from '../assets/images/avatars/accessories/crown.png';
import flower from '../assets/images/avatars/icons/accessories/flower.png';
import flowerPreview from '../assets/images/avatars/accessories/flower.png';
import headphones from '../assets/images/avatars/icons/accessories/headphones.png';
import headphonesPreview from '../assets/images/avatars/accessories/headphones.png';
import ninja from '../assets/images/avatars/icons/accessories/ninja.png';
import ninjaPreview from '../assets/images/avatars/accessories/ninja.png';
import sunglasses from '../assets/images/avatars/icons/accessories/sunglasses.png';
import sunglassesPreview from '../assets/images/avatars/accessories/sunglasses.png';

import basketball from '../assets/images/avatars/icons/body/basketball.png';
import basketballPreview from '../assets/images/avatars/body/basketball.png';
import chain from '../assets/images/avatars/icons/body/chain.png';
import chainPreview from '../assets/images/avatars/body/chain.png';
import dumbell from '../assets/images/avatars/icons/body/dumbell.png';
import dumbellPreview from '../assets/images/avatars/body/dumbell.png';
import macbook from '../assets/images/avatars/icons/body/macbook.png';
import macbookPreview from '../assets/images/avatars/body/macbook.png';
import scarf from '../assets/images/avatars/icons/body/scarf.png';
import scarfPreview from '../assets/images/avatars/body/scarf.png';
import sunflower from '../assets/images/avatars/icons/body/sunflower.png';
import sunflowerPreview from '../assets/images/avatars/body/sunflower.png';
import cats from '../assets/images/avatars/icons/body/cats.png';
import catsPreview from '../assets/images/avatars/body/cats.png';

import def from '../assets/images/avatars/icons/default.png';

import { DuckItems, DuckObject, Option } from '@/types/avatar/avatar';
import { Colors, Face, Accessory, Body } from '@ddays-app/types';

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

export const DUCK_OPTIONS: Record<DuckItems, Option[]> = {
  [DuckItems.COLORS]: [
    {
      name: 'Original',
      imageSrc: yellow,
      value: Colors.YELLOW,
      imagePreviewSrc: yellowPreview,
    },
    {
      name: 'Narančasta',
      imageSrc: orange,
      value: Colors.ORANGE,
      imagePreviewSrc: orangePreview,
    },
    {
      name: 'Kakasta',
      imageSrc: brown,
      value: Colors.BROWN,
      imagePreviewSrc: brownPreview,
    },
    {
      name: 'Dreamstar',
      imageSrc: purple,
      value: Colors.PURPLE,
      imagePreviewSrc: purplePreview,
    },
    {
      name: 'Mountain Dew',
      imageSrc: green,
      value: Colors.GREEN,
      imagePreviewSrc: greenPreview,
    },
    {
      name: 'Teška priča',
      imageSrc: blue,
      value: Colors.BLUE,
      imagePreviewSrc: bluePreview,
    },
    {
      name: 'Dama sa Balkana',
      imageSrc: red,
      value: Colors.RED,
      imagePreviewSrc: redPreview,
    },
    {
      name: 'Pepel od duvana',
      imageSrc: gray,
      value: Colors.GRAY,
      imagePreviewSrc: grayPreview,
    },
  ],
  [DuckItems.FACE]: [
    {
      name: 'Trepavice',
      imageSrc: eyelashes,
      value: Face.EYELASHES,
      imagePreviewSrc: eyelashesPreview,
    },
    {
      name: 'Ljutko',
      imageSrc: angry,
      value: Face.ANGRY,
      imagePreviewSrc: angryPreview,
    },
    {
      name: 'Stanje pred ispite',
      imageSrc: crying,
      value: Face.CRYING,
      imagePreviewSrc: cryingPreview,
    },
    {
      name: 'Dama iz Pariza',
      imageSrc: mole,
      value: Face.MOLE,
      imagePreviewSrc: molePreview,
    },
    {
      name: 'Dr. Pringles',
      imageSrc: mustache,
      value: Face.MUSTACHE,
      imagePreviewSrc: mustachePreview,
    },
    {
      name: 'Piercing',
      imageSrc: noseRing,
      value: Face.NOSE_RING,
      imagePreviewSrc: noseRingPreview,
    },
    {
      name: 'Tetovaža',
      imageSrc: tattoo,
      value: Face.TATTOO,
      imagePreviewSrc: tattooPreview,
    },
    {
      name: '',
      imageSrc: def,
      value: Face.DEFAULT,
      imagePreviewSrc: undefined,
    },
  ],
  [DuckItems.ACCESSORIES]: [
    {
      name: 'Brze cvike',
      imageSrc: sunglasses,
      value: Accessory.SUNGLASSES,
      imagePreviewSrc: sunglassesPreview,
    },
    {
      name: 'Kruna',
      imageSrc: crown,
      value: Accessory.CROWN,
      imagePreviewSrc: crownPreview,
    },
    {
      name: 'Holy Moly',
      imageSrc: angel,
      value: Accessory.ANGEL,
      imagePreviewSrc: angelPreview,
    },
    {
      name: 'DD Beretka',
      imageSrc: beret,
      value: Accessory.BERET,
      imagePreviewSrc: beretPreview,
    },
    {
      name: 'Karate Kid',
      imageSrc: ninja,
      value: Accessory.NINJA,
      imagePreviewSrc: ninjaPreview,
    },
    {
      name: 'Slušalice',
      imageSrc: headphones,
      value: Accessory.HEADPHONES,
      imagePreviewSrc: headphonesPreview,
    },
    {
      name: 'Hawaii',
      imageSrc: flower,
      value: Accessory.FLOWER,
      imagePreviewSrc: flowerPreview,
    },
    {
      name: '',
      imageSrc: def,
      value: Accessory.DEFAULT,
      imagePreviewSrc: undefined,
    },
  ],
  [DuckItems.BODY]: [
    {
      name: 'Šal(iš) se',
      imageSrc: scarf,
      value: Body.SCARF,
      imagePreviewSrc: scarfPreview,
    },
    {
      name: 'Bling Bling',
      imageSrc: chain,
      value: Body.CHAIN,
      imagePreviewSrc: chainPreview,
    },
    {
      name: 'Ko šar ka',
      imageSrc: basketball,
      value: Body.BASKETBALL,
      imagePreviewSrc: basketballPreview,
    },
    {
      name: 'Dumpbook',
      imageSrc: macbook,
      value: Body.MACBOOK,
      imagePreviewSrc: macbookPreview,
    },
    {
      name: 'Cvjetić',
      imageSrc: sunflower,
      value: Body.SUNFLOWER,
      imagePreviewSrc: sunflowerPreview,
    },
    {
      name: 'Fesbove mace',
      imageSrc: cats,
      value: Body.CATS,
      imagePreviewSrc: catsPreview,
    },
    {
      name: 'Nino Borović',
      imageSrc: dumbell,
      value: Body.DUMBELL,
      imagePreviewSrc: dumbellPreview,
    },
    {
      name: '',
      imageSrc: def,
      value: Body.DEFAULT,
      imagePreviewSrc: undefined,
    },
  ],
};

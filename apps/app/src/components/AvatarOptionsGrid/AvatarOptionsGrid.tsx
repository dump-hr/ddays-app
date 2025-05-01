import { Option } from '@/types/avatar/avatar';
import { FC } from 'react';
import c from './AvatarOptionsGrid.module.scss';
import { ImageWrapper } from '../ImageWrapper';
import { Accessory, Body, Colors, Face } from '@ddays-app/types';

const DO_NOT_SHOW_DELIMETER: (Colors | Face | Accessory | Body)[] = [
  Face.DEFAULT,
  Accessory.DEFAULT,
  Body.DEFAULT,
];

type AvatarOptionsGridProps = {
  options: Option[];
  onSelectOptions: (option: Option) => void;
  selectedOption: Option;
};

export const AvatarOptionsGrid: FC<AvatarOptionsGridProps> = ({
  options,
  onSelectOptions,
  selectedOption,
}) => {
  return (
    <div className={c.container}>
      <div className={c.selectedText}>
        <p className={c.selectedTextDefault}>
          Opcije
          {DO_NOT_SHOW_DELIMETER.includes(selectedOption.value) ? '' : '// '}
        </p>
        <p className={c.selectedTextOption}>{selectedOption.name}</p>
      </div>
      <div className={c.optionsGrid}>
        {options.map((option) => (
          <ImageWrapper
            key={option.value}
            imageSrc={option.imageSrc}
            altText={''}
            isSelected={selectedOption === option}
            onClick={() => onSelectOptions(option)}
            width={74}
            height={74}
            showBackground={false}
            borderRadius={16}
            borderWidth={1.5}
            imagePadding={8}
            alwaysShowBorder={true}
          />
        ))}
      </div>
    </div>
  );
};

import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { ducks } from '@/constants';
import c from './AvatarPickerRegistrationForm.module.scss';
import { ImageWrapper } from '@/components/ImageWrapper';
import { DuckObject } from '@/types/avatar/avatar';
import { useDeviceType } from '@/hooks/UseDeviceType';

type Props = {
  setSelectedDuck: (duck: DuckObject) => void;
};

export const DuckList: FC<Props> = ({ setSelectedDuck }) => {
  const [selectedDuckIndex, setSelectedDuckIndex] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);
  const { isMobile } = useDeviceType({});

  const getModIndex = (index: number): number => {
    return ((index % ducks.length) + ducks.length) % ducks.length;
  };

  const getVisibleDucks = useCallback(() => {
    const windowSize = isMobile ? 20 : 6;
    const halfWindow = Math.floor(windowSize / 2);

    return Array.from({ length: windowSize + 1 }, (_, i) => {
      const virtualIndex = selectedDuckIndex + (i - halfWindow);
      const realIndex = getModIndex(virtualIndex);

      return {
        duck: ducks[realIndex],
        virtualIndex,
        realIndex,
      };
    });
  }, [selectedDuckIndex, isMobile]);

  const scrollToSelected = useCallback(() => {
    if (!listRef.current) return;

    const centerElement = listRef.current.children[
      Math.floor(getVisibleDucks().length / 2)
    ] as HTMLElement;

    if (centerElement) {
      const listWidth = listRef.current.offsetWidth;
      const cardWidth = centerElement.offsetWidth;
      const scrollPosition =
        centerElement.offsetLeft - listWidth / 2 + cardWidth / 2;

      listRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [getVisibleDucks]);

  const handleScroll = useCallback(() => {
    if (!listRef.current || isDragging.current) return;
  }, []);

  const handleSelectDuck = (virtualIndex: number): void => {
    const newIndex = getModIndex(virtualIndex);
    setSelectedDuckIndex(virtualIndex);
    setSelectedDuck(ducks[newIndex]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (listRef.current?.offsetLeft || 0);
    scrollLeft.current = listRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const x = e.pageX - (listRef.current?.offsetLeft || 0);
    const distance = x - startX.current;
    if (listRef.current) {
      listRef.current.scrollLeft = scrollLeft.current - distance;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    scrollToSelected();
    const wrappedIndex = getModIndex(selectedDuckIndex);
    setSelectedDuck(ducks[wrappedIndex]);
  }, [selectedDuckIndex, scrollToSelected, setSelectedDuck]);

  const visibleDucks = getVisibleDucks();

  return (
    <div className={c.duckListContainer}>
      <div
        className={c.duckListWrapper}
        ref={listRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        {visibleDucks.map(({ duck, virtualIndex, realIndex }) => (
          <DuckCard
            key={virtualIndex}
            {...duck}
            isSelected={virtualIndex === selectedDuckIndex}
            onClick={() => handleSelectDuck(virtualIndex)}
            position={virtualIndex - selectedDuckIndex}
            virtualIndex={virtualIndex}
            realIndex={realIndex}
          />
        ))}
      </div>
    </div>
  );
};

interface DuckCardProps extends DuckObject {
  isSelected: boolean;
  onClick: () => void;
  position: number;
  virtualIndex: number;
  realIndex: number;
}

const DuckCard: FC<DuckCardProps> = ({
  imageSrc,
  name,
  description,
  isSelected,
  onClick,
  position,
  virtualIndex,
  realIndex,
}) => {
  const getCardStyle = () => {
    const scale = isSelected ? 1 : 0.8;
    if (position === 0) {
      return {
        transform: `scale(${scale})`,
        zIndex: isSelected ? 10 : 1,
        opacity: 1,
      };
    }
    return {
      transform: `scale(${scale})`,
      zIndex: Math.max(1, 10 - Math.abs(position)),
      opacity: 0.8,
    };
  };

  return (
    <div
      className={`${c.duckItemWrapper} ${
        isSelected ? c.selected : c.unselected
      }`}
      style={{
        ...getCardStyle(),
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
      data-virtual-index={virtualIndex}
      data-real-index={realIndex}>
      <ImageWrapper
        imageSrc={imageSrc}
        altText={name}
        isSelected={isSelected}
        onClick={onClick}
        width={194}
        height={194}
      />
      <div className={`${c.duckItemTextWrapper} ${isSelected ? '' : c.hidden}`}>
        <p className={c.duckItemTitle}>{name}</p>
        <p className={c.duckItemDescription}>{description}</p>
      </div>
    </div>
  );
};

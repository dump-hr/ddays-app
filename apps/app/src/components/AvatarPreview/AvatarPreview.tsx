import { DuckItems, Option } from '@/types/avatar/avatar';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import c from './AvatarPreview.module.scss';
import podium from '../../assets/images/avatars/podium.png';
import html2canvas from 'html2canvas';

export interface AvatarPreviewRef {
  captureAvatar: () => Promise<Blob | null>;
}

type AvatarPreviewProps = {
  elements: Record<DuckItems, Option>;
  selectedOption: DuckItems;
};

export const AvatarPreview = forwardRef<AvatarPreviewRef, AvatarPreviewProps>(
  ({ elements, selectedOption }, ref) => {
    const avatarRef = useRef<HTMLDivElement>(null);
    const isZoomed = selectedOption === DuckItems.FACE;

    const captureAvatar = async (): Promise<Blob | null> => {
      if (!avatarRef.current) return null;

      try {
        const avatarContainer = avatarRef.current;
        const wasZoomed = avatarContainer.classList.contains(c.zoomedIn);

        if (wasZoomed) {
          const originalTransform = avatarContainer.style.transform;

          avatarContainer.classList.remove(c.zoomedIn);
          const colorImage = avatarContainer.querySelector(`.${c.colors}`);
          if (colorImage) {
            colorImage.classList.remove(c.zoomedIn);
          }

          avatarContainer.style.transform = '';

          await new Promise((resolve) => setTimeout(resolve, 50));

          const canvas = await html2canvas(avatarContainer, {
            backgroundColor: '#2D2C2C',
            scale: 4,
            logging: false,
            useCORS: true,
            allowTaint: true,
          });

          if (wasZoomed) {
            avatarContainer.classList.add(c.zoomedIn);
            if (colorImage) {
              colorImage.classList.add(c.zoomedIn);
            }
            avatarContainer.style.transform = originalTransform;
          }

          return new Promise((resolve, reject) => {
            canvas.toBlob(
              (blob) => {
                if (blob) resolve(blob);
                else reject(new Error('Failed to generate image'));
              },
              'image/png',
              1.0,
            );
          });
        } else {
          const canvas = await html2canvas(avatarContainer, {
            backgroundColor: null,
            scale: 4,
            logging: false,
            useCORS: true,
            allowTaint: true,
          });

          return new Promise((resolve, reject) => {
            canvas.toBlob(
              (blob) => {
                if (blob) resolve(blob);
                else reject(new Error('Failed to generate image'));
              },
              'image/png',
              1.0,
            );
          });
        }
      } catch (error) {
        console.error('Failed to capture avatar:', error);
        return null;
      }
    };

    useImperativeHandle(ref, () => ({ captureAvatar }));

    return (
      <div className={`${c.container} ${isZoomed ? c.zoomedContainer : ''}`}>
        {!isZoomed && <img src={podium} alt='' className={c.podium} />}

        <div
          className={`${c.avatarContainer} ${isZoomed ? c.zoomedIn : ''}`}
          ref={avatarRef}>
          {Object.entries(elements).map(([key, value]) => {
            const itemType = key as DuckItems;

            return (
              <img
                key={key}
                src={value.imagePreviewSrc}
                alt={value.name}
                className={`
                  ${c.avatar} 
                  ${c[itemType]} 
                  ${c[value.value]} 
                  
                `}
                data-type={itemType}
                data-value={value.value}
                style={{
                  transformOrigin:
                    itemType === DuckItems.COLORS
                      ? 'center bottom'
                      : 'center center',
                }}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

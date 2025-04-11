import AccreditationTerminal from '@/assets/images/accreditation-terminal.png';
import AccreditationPaperTexture from '@/assets/images/accreditaion-paper-texture.png';
import AccreditationRippedPaper from '@/assets/images/accreditation-ripped-paper.png';
import Logo from '@/assets/icons/logo.svg';
import AccreditationRecieptText from '@/assets/icons/accreditation-reciept-text.svg';
import QRCodePlaceholder from '@/assets/images/qr-code-placeholder.png';
import CloseIcon from '@/assets/icons/close-icon.svg';
import clsx from 'clsx';
import styles from './Accreditation.module.scss';
import { useState, useEffect } from 'react';

interface AccreditationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Accreditation: React.FC<AccreditationProps> = ({ isOpen, onClose }) => {
  const [animationStyle, setAnimationStyle] = useState({});
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [openAnimationEnd, setOpenAnimationEnd] = useState(false);
  const [closingAnimationSecondVisit, setClosingAnimationSecondVisit] =
    useState(false);

  const handleClose = () => {
    setClosingAnimation(true);
    setAnimationStyle({});
    setTimeout(() => {
      setClosingAnimation(false);
      setOpenAnimationEnd(false);
      localStorage.setItem('firstAccreditationVisit', 'false');
      onClose();
    }, 2000);
  };

  const handleCloseSecondVisit = () => {
    setClosingAnimationSecondVisit(true);
    setTimeout(() => {
      setClosingAnimationSecondVisit(false);
      onClose();
    }, 500);
  }

  const firstAccreditationVisit = localStorage.getItem(
    'firstAccreditationVisit',
  );

  useEffect(() => {
    if (isOpen && firstAccreditationVisit !== 'false') {
      const glitchSteps: { transform: string; transition: string }[] = [];
      for (let i = 0; i < 10; i++) {
        glitchSteps.push({
          transform: `translateY(${100 - 10 * i}%)`,
          transition: `transform 0.2s ease-out ${i === 0 && 0.15}s`,
        });
      }

      let step = 0;
      const interval = setInterval(() => {
        setAnimationStyle(glitchSteps[step]);
        step++;
        if (step > glitchSteps.length) {
          setAnimationStyle({
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease-out',
          });
          setOpenAnimationEnd(true);
          clearInterval(interval);
        }
      }, 200);
    }
  }, [isOpen, firstAccreditationVisit]);
  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.wrapperClosing]: closingAnimation,
        [styles.wrapperClosingSecondVisit]: closingAnimationSecondVisit,
        [styles.wrapperOpen]: isOpen,
      })}>
      <img
        src={AccreditationTerminal}
        alt='accreditation-terminal'
        className={clsx(styles.accreditationTerminalImage, {
          [styles.terminalOpening]: isOpen,
          [styles.terminalClosing]: closingAnimation,
        })}
        style={{
          display: firstAccreditationVisit === 'false' ? 'none' : 'block',
        }}
      />
      <div
        className={clsx(styles.accreditationPaperContainer, {
          [styles.paperClosingContainer]: closingAnimation,
          [styles.paperContainerSecondVisit]:
            firstAccreditationVisit === 'false',
        })}>
        <div
          className={clsx(styles.accreditationPaper, {
            [styles.paperClosing]: closingAnimation,
            [styles.paperOnSecondVisit]: firstAccreditationVisit === 'false',
          })}
          style={animationStyle}>
          <div className={styles.header}>
            <img src={Logo} alt='logo' className={styles.logo} />
            <button
              onClick={
                firstAccreditationVisit === 'false' ? handleCloseSecondVisit : handleClose
              }>
              <img src={CloseIcon} alt='close' />
            </button>
          </div>
          <img
            className={styles.accreditationRecieptText}
            src={AccreditationRecieptText}
            alt='accreditation-reciept-text'
          />
          <img
            src={AccreditationRippedPaper}
            alt='accreditation-ripped-paper'
            className={styles.accreditationRippedPaperImage}
          />
          <img
            src={QRCodePlaceholder}
            alt='qr-code-placeholder'
            className={styles.qrCodeImage}
          />
          <img
            src={AccreditationPaperTexture}
            alt='accreditation-paper-texture'
            className={styles.accreditationPaperTextureImage}
          />
        </div>
        <div
          className={clsx(styles.bottomShade, {
            [styles.shadeOpenAnimationEnd]: openAnimationEnd,
          })}
          style={{
            display: firstAccreditationVisit === 'false' ? 'none' : 'block',
          }}></div>
      </div>
    </div>
  );
};

export default Accreditation;

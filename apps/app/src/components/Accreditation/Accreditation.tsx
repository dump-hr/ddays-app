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

  const handleClose = () => {
    setClosingAnimation(true);
    setAnimationStyle({});
    setTimeout(() => {
      setClosingAnimation(false);
      setOpenAnimationEnd(false);
      onClose();
    }, 1500);
  };

  useEffect(() => {
    if (isOpen) {
      const glitchSteps: { transform: string; transition: string }[] = [];
      for (let i = 0; i < 20; i++) {
        glitchSteps.push({
          transform: `translateY(${100 - 5 * i}%)`,
          transition: 'transform 0.1s ease-out',
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
  }, [isOpen]);
  return (
    <div className={clsx(styles.wrapper, { [styles.wrapperOpen]: isOpen })}>
      <img
        src={AccreditationTerminal}
        alt='accreditation-terminal'
        className={styles.accreditationTerminalImage}
      />
      <div
        className={clsx(styles.accreditationPaperContainer, {
          [styles.paperClosingContainer]: closingAnimation,
        })}>
        <div
          className={clsx(styles.accreditationPaper, {
            [styles.paperClosing]: closingAnimation,
          })}
          style={animationStyle}>
          <div className={styles.header}>
            <img src={Logo} alt='logo' className={styles.logo} />
            <button onClick={handleClose}>
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
          })}></div>
      </div>
    </div>
  );
};

export default Accreditation;

import { ReactNode } from 'react';
import style from './AlertSection.module.scss';
import WarnIcon from '@/assets/icons/warn.svg';

const AlertSection = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <img src={WarnIcon} />
      <div>{children}</div>
    </div>
  );
};

export default AlertSection;

import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import styles from './TransactionPopup.module.scss';
import CloseIcon from '@/assets/icons/close-icon.svg';
import DumpDaysIcon from '@/assets/icons/dump-days-logo.svg';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { TransactionItemDto } from '@ddays-app/types/src/dto/shop';
import { useDeviceType } from '@/hooks/UseDeviceType';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
  item: TransactionItemDto;
}

const TransactionPopup = ({ isOpen, closePopup, item }: PopupProps) => {
  const { isMobile: isSmallMobile} = useDeviceType({breakpoint: 390})
  return (
    <div className={clsx(styles.wrapper, { [styles.open]: isOpen })}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <img src={DumpDaysIcon} className={styles.logo} />
            <img
              src={CloseIcon}
              onClick={closePopup}
              className={styles.closeIcon}
            />
          </div>
          <div className={styles.textContainer}>
            <p>DUMP Udruga mladih programera</p>
            <p>Fakultet elektrotehnike strojarstva i brodogradnje</p>
            <p>Ul. Ruđera Boškovića 32, 21000 Split</p>
            <p>Atrij fakulteta, dvorane A100 i A101</p>
            <br />
            <p>Račun broj 21846103</p>
            <br />
            <table className={styles.tableArticle}>
              <thead>
                <tr>
                  <td>Naziv artikla</td>
                  <td>Kol</td>
                  <td>Cijena</td>
                  <td>Iznos</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.shopItem.itemName?.toUpperCase()}</td>
                  <td>{item.quantity}</td>
                  <td>0,00EUR</td>
                  <td>0,00EUR</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.totalContainer}>
              <p>UKUPNO EUR</p>
              <p>0,00</p>
            </div>
            <table className={styles.tablePayment}>
              <thead>
                <tr>
                  <td>PDV</td>
                  <td>Osnovica</td>
                  <td>Iznos</td>
                  <td>Ukupno</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>25%</td>
                  <td>0,00</td>
                  <td>0,00</td>
                  <td>0,00</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.additionalInfoTable}>
              <div className={styles.row}>
                <p className={styles.rowName}>Kor. ozn.</p>
                <p className={styles.rowValue}>{item.userId}</p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowName}>Datum</p>
                <p className={styles.rowValue}>
                  {getCurrentDate(
                    new Date() /* promjeniti ovaj param sa datumom koji dolazi sa backend*/,
                  )}
                </p>
              </div>
            </div>
            <p>Raspored dostupan na days.dump.hr!</p>
          </div>
          <div className={styles.qrCodeContainer}>
            <QRCodeSVG value={'https://days.dump.hr'} size={!isSmallMobile ? 160 : 140} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPopup;

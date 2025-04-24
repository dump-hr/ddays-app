import styles from './RecieptText.module.scss';
import { getCurrentDate } from '@/helpers/getCurrentDate';

interface RecieptTextProps {
  item: {
    id: string;
    userId: string;
    orderedAt: Date;
    shopItem: {
      itemName?: string;
    };
    quantity: number;
  };
}

const RecieptText: React.FC<RecieptTextProps> = ({ item }) => {
  return (
    <div>
      <div className={styles.textContainer}>
        <p>DUMP Udruga mladih programera</p>
        <p>Fakultet elektrotehnike strojarstva i brodogradnje</p>
        <p>Ul. Ruđera Boškovića 32, 21000 Split</p>
        <p>Atrij fakulteta, dvorane A100 i A101</p>
        <br />
        <p>Račun broj {`${item.id}`}</p>
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
              {getCurrentDate(new Date(item.orderedAt || ''))}
            </p>
          </div>
        </div>
        <p>Raspored dostupan na days.dump.hr!</p>
      </div>
    </div>
  );
};

export default RecieptText;

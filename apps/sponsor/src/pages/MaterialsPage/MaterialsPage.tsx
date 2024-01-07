import { FormStatus } from '../../types';
import c from './MaterialsPage.module.scss';

const statusChips = {
  [FormStatus.Pending]: (
    <div className={c.statusChip}>
      <p>Predaj materijale</p>
    </div>
  ),
  [FormStatus.Good]: (
    <div className={c.statusChip}>
      <img src='/status-success.svg' />
      <p>Uredi</p>
    </div>
  ),
  [FormStatus.Bad]: (
    <div className={c.statusChip}>
      <img src='/status-error.svg' />
      <p>Uredi</p>
    </div>
  ),
};

const MaterialsPage: React.FC = () => {
  return (
    <main className={c.page}>
      <div className={c.pageWrapper}>
        <section className={c.itemsWrapper}>
          <article className={c.item}>
            <div className={c.itemInfo}>
              <p className={c.itemIndex}>1</p>
              <div>
                <h4>Opisi tvrtke</h4>
                <p>Description</p>
              </div>
            </div>
            <div className={c.itemAction}>
              {statusChips[FormStatus.Pending]}
              <img src='/arrow-right.svg' alt='Open' />
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default MaterialsPage;

import CircularButton from '../../components/CircularButton';
import LayoutSpacing from '../../components/LayoutSpacing';
import CoverImage from './assets/cover.png';
import c from './CompanyProfile.module.scss';

const CompanyProfile = () => {
  return (
    <>
      <section className={c.headerInfo}>
        <LayoutSpacing style={{ height: '100%' }}>
          <img src={CoverImage} className={c.coverImage} alt='Cover' />
          <div className={c.basicInfo}>
            <div className={c.logoImage}></div>
            <div className={c.infoContainer}>
              <div className={c.companyName}>
                <h3>Profico</h3>
                <p>profi.co</p>
              </div>
              <CircularButton className={c.submitButton}>
                Predaj materijale
              </CircularButton>
            </div>
          </div>
        </LayoutSpacing>
      </section>
      <section className={c.mainCards}>
        <LayoutSpacing>
          <div className={c.cardsLayout}>
            <div className={c.left}>
              <div className={c.card}></div>
              <div className={c.card}></div>
            </div>
            <div className={c.right}>
              <div className={c.card}></div>
            </div>
          </div>
        </LayoutSpacing>
      </section>
    </>
  );
};

export default CompanyProfile;

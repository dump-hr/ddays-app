import CircularButton from '../../components/CircularButton';
import InfoCard from '../../components/InfoCard';
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
              <InfoCard
                title='O nama'
                buttonText='Saznaj više'
                onClick={() => console.log('Clicked')}></InfoCard>
              <InfoCard
                title='Kontakt'
                buttonText='Pošalji poruku'
                onClick={() => console.log('Clicked')}></InfoCard>
            </div>
            <div className={c.right}>
              <InfoCard
                title='Proizvodi'
                buttonText='Pogledaj sve'
                onClick={() => console.log('Clicked')}></InfoCard>
            </div>
          </div>
        </LayoutSpacing>
      </section>
    </>
  );
};

export default CompanyProfile;

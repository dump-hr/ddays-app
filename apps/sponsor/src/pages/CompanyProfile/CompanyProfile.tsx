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
              <button className={c.submitButton}>Predaj materijale</button>
            </div>
          </div>
        </LayoutSpacing>
      </section>
    </>
  );
};

export default CompanyProfile;

import c from './TermsAndConditionsPage.module.scss';
import ArrowLeftWhite from '@/assets/icons/arrow-left-white.svg';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router-dom';
import { useDeviceType } from '../../hooks/UseDeviceType';

export const TermsAndConditionsPage = () => {
  const { isMobile } = useDeviceType({});

  const navigate = useNavigate();

  return (
    <div className={c.wrapper}>
      <button className={c.backButton} onClick={() => navigate(-1)}>
        <img src={isMobile ? ArrowLeft : ArrowLeftWhite} alt='' />
      </button>
      <div className={c.sectionsWrapper}>
        <h1 className={c.title}>Uvjeti i odredbe</h1>
        <section>
          <h2 className={c.subtitle}>Naslov sekcije</h2>
          <p className={c.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            explicabo, voluptatibus animi tempore voluptatem error ipsam
            assumenda consequuntur voluptates ea. Suscipit consequuntur rerum
            laudantium quidem unde quam aut, distinctio eius!
          </p>
        </section>
        <section>
          <h2 className={c.subtitle}>Naslov sekcije</h2>
          <p className={c.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            explicabo, voluptatibus animi tempore voluptatem error ipsam
            assumenda consequuntur voluptates ea. Suscipit consequuntur rerum
            laudantium quidem unde quam aut, distinctio eius!
          </p>
        </section>
        <section>
          <h2 className={c.subtitle}>Naslov sekcije</h2>
          <p className={c.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            explicabo, voluptatibus animi tempore voluptatem error ipsam
            assumenda consequuntur voluptates ea. Suscipit consequuntur rerum
            laudantium quidem unde quam aut, distinctio eius!
          </p>
        </section>
      </div>
    </div>
  );
};

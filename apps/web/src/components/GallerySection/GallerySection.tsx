import c from './GallerySection.module.scss';
import ArrowTopRight from '../../assets/icons/arrow-top-right.svg';

const GallerySection = () => {
  return (
    <section className={c.gallerySection}>
      <h3 className={c.title}>Galerija</h3>
      <p className={c.subtitle}>Throwback na prošlogodišnja izdanja Daysa</p>
      <img src={ArrowTopRight} className={c.arrow} />
    </section>
  );
};

export default GallerySection;

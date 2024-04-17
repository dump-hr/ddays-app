import c from './GallerySection.module.scss';
import ArrowTopRight from '../../assets/icons/arrow-top-right.svg';

const GallerySection = () => {
  const onClickHandler = () => {
    window.open(
      'https://www.flickr.com/photos/143904306@N07/albums/',
      '_blank',
    );
  };

  return (
    <section className={c.gallerySection} onClick={onClickHandler}>
      <h3 className={c.title}>Galerija</h3>
      <p className={c.subtitle}>Throwback na prošlogodišnja izdanja Daysa</p>
      <img src={ArrowTopRight} className={c.arrow} />
    </section>
  );
};

export default GallerySection;

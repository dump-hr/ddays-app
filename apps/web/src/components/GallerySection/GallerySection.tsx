import c from './GallerySection.module.scss';

const GallerySection = () => {
  const onClickHandler = () => {
    window.open(
      'https://www.flickr.com/photos/143904306@N07/albums/',
      '_blank',
    );
  };

  return (
    <section className={c.gallerySection} onClick={onClickHandler}>
      <div className={c.content}>
        <p className={c.subtitle}>
          Throwback na prošlogodišnja izdanja Daysa
        </p>
        <h3 className={c.title}>Galerija</h3>
      </div>
    </section>
  );
};

export default GallerySection;

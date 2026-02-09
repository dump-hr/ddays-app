import DuckImage from '@/assets/images/see-you-later-duck.png';
import c from './ClosedAppPage.module.scss';

const ClosedAppPage = () => {
  return (
    <div className={c.page}>
      <img src={DuckImage} alt='See you later duck' className={c.duck} />
      <h1 className={c.title}>Vidimo se!</h1>
      <p className={c.text}>Vidimo se uskoro...</p>
    </div>
  );
};
export default ClosedAppPage;

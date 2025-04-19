import clsx from 'clsx';
import c from './SearchBar.module.scss';
import Magnifier from '@/assets/icons/magnifier.svg';

type SeachBarProps = React.HTMLProps<HTMLInputElement>;

const SearchBar: React.FC<SeachBarProps> = ({ className, ...props }) => {
  return (
    <div className={clsx(c.searchBar, className)}>
      <img className={c.icon} src={Magnifier} />
      <input {...props} className={c.input} type='text' name='' id='' />
    </div>
  );
};

export default SearchBar;

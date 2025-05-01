import { useRef } from 'react';
import c from './ClipboardPaster.module.scss';
import toast from 'react-hot-toast';

type ClipboardPasterProps = {
  text: string;
};

const ClipboardPaster: React.FC<ClipboardPasterProps> = ({ text }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function copyToClipboard() {
    navigator.clipboard.writeText(text);
    inputRef.current?.select();
    toast.success('Kopirano u međuspremnik!', {
      position: 'top-center',
    });
  }

  return (
    <div className={c.clipboardPaster}>
      <input type='text' className={c.text} value={text} ref={inputRef} />
      <div className={c.buttons}>
        <button className={c.button} onClick={() => window.open(text)}>
          Otvori
        </button>
        <button className={c.button} onClick={copyToClipboard}>
          Kopiraj
        </button>
      </div>
    </div>
  );
};

export default ClipboardPaster;

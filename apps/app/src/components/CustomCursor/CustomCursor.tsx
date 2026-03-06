import { useEffect, useState } from 'react';
import c from './CustomCursor.module.scss';
import cursorNormal from '../../assets/images/Normal.png';
import cursorHover from '../../assets/images/Hover.png';
import cursorClick from '../../assets/images/Click.png';

type CursorState = 'normal' | 'hover' | 'click';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<CursorState>('normal');

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseDown = () => setState('click');
    const mouseUp = () => setState('normal');
    const hover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor-hover]",
      );

      if (interactive)
        setState((prev) => (prev === 'click' ? 'click' : 'hover'));
      else setState((prev) => (prev === 'click' ? 'click' : 'normal'));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    document.addEventListener('mouseover', hover);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mouseover', hover);
    };
  }, []);

  const cursorImage =
    state === 'click'
      ? cursorClick
      : state === 'hover'
        ? cursorHover
        : cursorNormal;

  return (
    <img
      src={cursorImage}
      alt='Custom Cursor'
      className={c.customCursor}
      style={{
        left: position.x,
        top: position.y,
      }}></img>
  );
};

export default CustomCursor;

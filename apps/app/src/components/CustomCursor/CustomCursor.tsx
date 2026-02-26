import { useEffect, useState } from 'react';
import c from './CustomCursor.module.scss';

import cursorNormal from '../../assets/images/Normal.png';
import cursorHover from '../../assets/images/Hover.png';
import cursorClick from '../../assets/images/Click.png';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [state, setState] = useState('normal');

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseDown = () => setState('click');
    const mouseUp = () => setState('normal');

    const allElements = Array.from(document.querySelectorAll<HTMLElement>('*'));
    const hoverElements = allElements.filter(
      (el) => getComputedStyle(el).cursor === 'pointer',
    );

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => setState('hover'));
      el.addEventListener('mouseleave', () => setState('normal'));
    });

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
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

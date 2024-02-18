import { useState } from 'react';

import c from './SlicedParagraph.module.scss';

type SlicedParagraphProps = {
  text: string;
  clipLength: number;
};
function SlicedParagraph({ text, clipLength }: SlicedParagraphProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length < clipLength) return text;

  if (isExpanded) {
    return (
      <>
        {text}
        <br />
        <a onClick={() => setIsExpanded(false)} className={c.showMore}>
          show less
        </a>
      </>
    );
  } else {
    return (
      <>
        {text.slice(0, 40).trim() + '...'}
        <br />
        <a onClick={() => setIsExpanded(true)} className={c.showMore}>
          show more
        </a>
      </>
    );
  }
}

export default SlicedParagraph;

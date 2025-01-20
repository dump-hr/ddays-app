import React from 'react';
import c from './PageTitleLayout.module.scss';

type PageTitleLayoutType = {
  title: string;
  children: React.ReactNode;
};

const PageTitleLayout: React.FC<PageTitleLayoutType> = ({
  title,
  children,
}) => {
  return (
    <div className={c.pageTitleLayout}>
      <h1 className={c.title}>{title}</h1>
      {children}
    </div>
  );
};

export default PageTitleLayout;

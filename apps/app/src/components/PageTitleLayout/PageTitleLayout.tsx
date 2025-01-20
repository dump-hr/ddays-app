import React from 'react';
import c from './PageTitleLayout.module.scss';

type PageTitleLayoutType = {
  title: string;
  children?: React.ReactNode;
};

const PageTitleLayout: React.FC<PageTitleLayoutType> = ({
  title,
  children,
}) => {
  return (
    <main className={c.main}>
      <h1 className={c.title}>{title}</h1>
      <div className={c.content}>{children}</div>
    </main>
  );
};

export default PageTitleLayout;

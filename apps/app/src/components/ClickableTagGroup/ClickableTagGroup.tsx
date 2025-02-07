import c from './ClickableTagGroup.module.scss';
import React, { useState } from 'react';
import clsx from 'clsx';
import { ClickableTagProps } from '../ClickableTag/ClickableTag';

type ClickableTagGroupProps = {
  setter: (id: string) => void;
  children: React.ReactNode;
  defaultTag?: string | number;
  className?: string;
};

const ClickableTagGroup: React.FC<ClickableTagGroupProps> = ({
  setter,
  children,
  defaultTag,
  className,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleTabClick = (id: string) => {
    setActiveTag(id);
    setter(id);
  };

  return (
    <div className={clsx(c.clickableTagGroup, className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<ClickableTagProps>(child)) {
          return React.cloneElement(child, {
            isActive:
              activeTag === (child.props.id as string) ||
              (activeTag === null && child.props.id === defaultTag) ||
              (activeTag === null && defaultTag === undefined && index === 0),
            onClick: () => handleTabClick(child.props.id as string),
          });
        }
        return child;
      })}
    </div>
  );
};

export default ClickableTagGroup;

import c from './ClickableTagGroup.module.scss';
import React, { useState } from 'react';
import { TabProps } from '../Tab/Tab';
import clsx from 'clsx';

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
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setter(id);
  };

  return (
    <div className={clsx(c.clickableTagGroup, className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<TabProps>(child)) {
          return React.cloneElement(child, {
            isActive:
              activeTab === (child.props.id as string) ||
              (activeTab === null && child.props.id === defaultTag) ||
              (activeTab === null && defaultTag === undefined && index === 0),
            onClick: () => handleTabClick(child.props.id as string),
          });
        }
        return child;
      })}
    </div>
  );
};

export default ClickableTagGroup;

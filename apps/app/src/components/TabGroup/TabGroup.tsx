import c from './TabGroup.module.scss';
import React, { useState } from 'react';
import { TabProps } from '../Tab/Tab';
import clsx from 'clsx';

type TabGroupProps = {
  setter: (id: string) => void;
  children: React.ReactNode;
  defaultTab?: string | number;
  className?: string;
};

const TabGroup: React.FC<TabGroupProps> = ({
  setter,
  children,
  defaultTab,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setter(id);
  };

  return (
    <div className={clsx(c.tabGroup, className)}>
      <div className={c.tabsWrapper}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<TabProps>(child)) {
            return React.cloneElement(child, {
              isActive:
                activeTab === (child.props.id as string) ||
                (activeTab === null && child.props.id === defaultTab) ||
                (activeTab === null && defaultTab === undefined && index === 0),
              onClick: () => handleTabClick(child.props.id as string),
            });
          }
          return child;
        })}
      </div>
      <div className={c.divider}></div>
    </div>
  );
};

export default TabGroup;

import c from './TabGroup.module.scss';
import React, { useState } from 'react';
import { TabProps } from '../Tab/Tab';

type TabGroupProps = {
  setter: (id: string) => void;
  children: React.ReactNode;
};

const TabGroup: React.FC<TabGroupProps> = ({ setter, children }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setter(id);
  };

  return (
    <div className={c.tabGroup}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabProps>(child)) {
          return React.cloneElement(child, {
            isActive: activeTab === child.props.id,
            onClick: () => handleTabClick(child.props.id),
          });
        }
        return child;
      })}
    </div>
  );
};

export default TabGroup;

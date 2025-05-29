import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import {CustomTabsProps} from "../types/sharedTypes";

export const CustomTabs: React.FC<CustomTabsProps> = ({
                                                        tabs,
                                                        activeKey,
                                                        onTabChange,
                                                        variant = 'tabs',
                                                        className = '',
                                                      }) => {
  return (
    <Tabs
      activeKey={activeKey}
      onSelect={(k) => k && onTabChange(k)}
      className={className}
      variant={variant}
    >
      {tabs.map((tab) => (
        <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};

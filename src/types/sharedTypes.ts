import React from "react";
export type TabItem = {
  key: string;
  title: string;
  content: React.ReactNode;
};

export type CustomTabsProps = {
  tabs: TabItem[];
  activeKey: string;
  onTabChange: (key: string) => void;
  variant?: 'tabs' | 'pills'; // 👈 allow pills or tabs
  className?: string; // optional styling
};

export type Crumb = {
  label: string;
  url?: string;
  active?: boolean;
}

export type BreadcrumbProps = {
  crumbs?: Crumb[];
}

export type Item = {
  id: string;
  [key: string]: any; // others
};

export type ResponseData = {
  all: Item[];
  completed: Item[];
  inProgress: Item[];
  [key: string]: any; // others
};
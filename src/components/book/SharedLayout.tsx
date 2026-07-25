import React from 'react';
import { LayoutGroup } from 'motion/react';

interface SharedLayoutProps {
  pageKey: string;
  children: React.ReactNode;
}

export const SharedLayout: React.FC<SharedLayoutProps> = ({ pageKey, children }) => (
  <LayoutGroup id="journal-book-spread">
    <div data-spread-key={pageKey} className="contents">
      {children}
    </div>
  </LayoutGroup>
);

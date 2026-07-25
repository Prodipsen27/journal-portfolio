import React from 'react';

export const BookPaper: React.FC = React.memo(() => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0 book-paper-static"
  />
));

BookPaper.displayName = 'BookPaper';

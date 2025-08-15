import React from 'react';

export function Content({ children }: { children: React.ReactNode }) {
    return (
        <section className="content">
            {children}
        </section>
  );
}
import React from 'react';

export function Block({ children }: { children: React.ReactNode }) {
    return (
        <div className="block">
            {children}
        </div>
  );
}
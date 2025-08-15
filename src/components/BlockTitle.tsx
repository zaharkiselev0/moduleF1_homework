import React from 'react';
import { Row } from './Row';

export function BlockTitle({ children }: { children: React.ReactNode }) {
    return (
        <Row>
            <div className="block-title">
                {children}
            </div>
        </Row>
  );
}
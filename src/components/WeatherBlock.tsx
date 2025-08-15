import React from 'react';
import { Block } from './Block';
import { BlockTitle } from './BlockTitle';
import { Row } from './Row';

export function WeatherBlock({
    title,
    children,
    titleButton
}: {
    title: string;
    children: React.ReactNode;
    titleButton?: React.ReactNode;
}) {
    return (
        <section className="weather-block">
            <Block>
                <BlockTitle>
                    <Row>
                        <span>{title}</span>
                        {titleButton && titleButton}
                    </Row>
                </BlockTitle>
                {children}
            </Block>
        </section>
    );
}
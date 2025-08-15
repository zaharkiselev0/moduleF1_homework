import React from 'react';
import { useContext } from 'react';
import { Block } from './Block';
import { SunIcon } from './icons/SunIcon';
import { Row } from './Row';
import { Button } from './Button';
import { CityContext } from './AppSettingProvider';

export function Header() {
    const city = useContext(CityContext);
    const text = city ?
        `${city.name} ${city.state ? city.state : ''} ${city.country}` :
        "Местоположение не определено";

    return (
        <section className="header">
            <Block>
                <Row>
                    <Button startIcon={<SunIcon />} />
                    <Button text={text} endIcon={<SunIcon />} />
                </Row>
            </Block>
        </section>
    );
}
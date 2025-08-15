import React, { JSX } from "react";
import { useContext } from 'react';


export function Value({text, icon=null}: {text: string, icon: JSX.Element | null}) {
    return (
        <div className="value-block">
            {icon}
            <span className="value-text">{text}</span>
        </div>
    );
}


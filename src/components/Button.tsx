import React from 'react';

export function Button({startIcon,text,endIcon,}: {
    startIcon?: React.ReactNode;
    text?: string;
    endIcon?: React.ReactNode;
}) {
    return (
        <button className="btn">
            {startIcon && <span className="btn-icon-start">{startIcon}</span>}
            {text && <span className="btn-text">{text}</span>}
            {endIcon && <span className="btn-icon-end">{endIcon}</span>}
        </button>
    );
}
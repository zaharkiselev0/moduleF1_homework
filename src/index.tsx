import './styles/main.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
root.render(
    <>
        <App />
    </>
);
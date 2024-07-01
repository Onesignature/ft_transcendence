import './global-setup.js';
import { createRoot } from '../modules/onion-dom/index.js';
import { LocalizationManager as loc } from '../modules/localization/index.js';
import App from "./App.js";

async function initialize()
{
    await loc.setLanguage('en');

    const root = createRoot(document.getElementById('root'));

    root.render(String.raw`
        <div className=${App.name}></div>
    `);
}

initialize();
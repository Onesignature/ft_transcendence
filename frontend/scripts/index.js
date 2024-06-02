import {createRoot} from '../modules/onion-dom/index.js';
import App from "./App.js";
import './global-setup.js';

const root = createRoot(document.getElementById('root'));

root.render(App);
import { Component } from '../modules/Onion/index.js';
import Login from './pages/Login.js';

export default class App extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this._textExample = "test"; // Declare and initialize instance variable
    }

    onEnable()
    {
        this._textExample = "SPA";
    }

    onDisable()
    {
        console.log('clean');
    }

    callbackFunc()
    {
        console.log("Player button clicked!");
    }

    render()
    {
        return String.raw`
            <div className="${Login.name}" />
        `;
    }
}
import {Component} from '../../modules/onion/index.js';
import BaseButton from './components/BaseButton.js';

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
            ${BaseButton}
        `;
    }

    // render()
    // {
    //     return String.raw`
    //         <div class="app">
    //             <link rel="stylesheet" href="./styles/App.css">
    //             <h1 class="heading">Welcome</h1>
    //             <p style="color:red; font-size:12px">
    //                 This is a simple example of ${this._textExample} using onion framework
    //             </p>
    //             <nav>
    //                 <a href="/" data-link>Login</a>
    //                 <a href="/home" data-link>Home</a>
    //                 <div className="${BaseButton}" />
    //             </nav>
    //         </div>
    //     `;
    // }
}
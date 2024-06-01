import {Component} from '../../modules/onion/index.js';

export default class App extends Component
{
    constructor()
    {
        super();
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

    render()
    {
        return String.raw`
            <h1>Welcome</h1>
            <p>
                This is a simple example of ${this._textExample} using onion framework
            </p>
            <nav>
                <a href="/" data-link>Login</a>
                <a href="/home" data-link>Home</a>
                <login username-"faraz" />
            </nav>
        `;
    }
}
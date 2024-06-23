import { Component } from '../modules/Onion/index.js';
import Login from './pages/Login.js';

export default class App extends Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    onMount()
    {
        console.log('mounted');
        this.setState({test: "for example"});
    }

    onUnmount()
    {
        console.log('unmounted');
    }

    render()
    {
        return String.raw`
            <div classname=${Login.name}></div>
        `;
    }
}
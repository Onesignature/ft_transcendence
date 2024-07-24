import { Component } from '../../modules/onion/index.js';

export default class TestComponent extends Component
{
    handleClick()
    {
        console.log(this.context);
        this.context.navigate('/playMode');
    }

    render()
    {
        return String.raw`
            <button onClick="${this.handleClick.name}">Simple Route Button</button>
        `;
    }
}
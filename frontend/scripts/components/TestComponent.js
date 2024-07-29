import Onion, { Component } from '../../modules/onion/index.js';

export default class TestComponent extends Component
{
    render()
    {   
        console.log(this.props);
        return String.raw`
            <a>TestComponent</a>
        `;
    }
}
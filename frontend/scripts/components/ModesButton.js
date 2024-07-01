import { Component } from '../../modules/Onion/index.js';

export default class ModesButton extends Component
{
    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/ModesButton.css">
            <div class="modes-button" onclick=${this.props.onclick}>${this.props.text}</div>
        `;
    }
}
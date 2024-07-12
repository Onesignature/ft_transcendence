import { Component } from '../../modules/onion/index.js';

export default class BackButton extends Component
{
    render()
    {   
        return String.raw`
            <link rel="stylesheet" href="./styles/BackButton.css">
            <div class="back-button" onclick=${this.props.onclick}>${this.props.text}</div>
        `;
    }
}
import { Component } from '../../modules/Onion/index.js';

export default class BaseButton extends Component
{

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/BaseButton.css">
            <button style=${this.props.style} class="base-button" onclick=${this.props.onclick} >${this.props.text}</button>
        `;
    }
}
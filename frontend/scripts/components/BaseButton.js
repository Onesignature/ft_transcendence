import { Component } from '../../modules/Onion/index.js';

export default class BaseButton extends Component
{
    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/BaseButton.css">
            <button class="base-button" >${this.props.text}</button>
        `;
    }
}
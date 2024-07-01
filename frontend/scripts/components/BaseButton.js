import { Component } from '../../modules/Onion/index.js';

export default class BaseButton extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.props = {
            buttonstylepath: "./styles/BaseButton.css",
            buttonclass: "base-button"
        }
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="${this.props.buttonstylepath}">
            <button style="${this.props.style}" class="${this.props.buttonclass}" onclick=${this.props.onclick}>${this.props.text}</button>
        `;
    }
}
import { Component } from "../../Onion/index.js";

export default class Link extends Component
{
    handleClick(event)
    {
        event.preventDefault();
        this.context.navigate(this.props.to);
    }

    render()
    {
        return String.raw`
            <a href=${this.props.to} onClick=${this.handleClick}>
                ${this.props.children}
            </a>
        `;
    }
}
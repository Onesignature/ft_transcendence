import { Component } from "../../onion/index.js";

export default class Route extends Component
{
    renderComponent(location)
    {
        const { path, component } = this.props;
        const exact = !!(this.props.exact != undefined && this.props.exact != null);
        const match = exact ? location === path : location.startsWith(path);

        return match ? String.raw`<div className=${component}></div>` : "";
    }

    render()
    {
        return String.raw`
            ${this.renderComponent(this.context.location)}
        `;
    }
}
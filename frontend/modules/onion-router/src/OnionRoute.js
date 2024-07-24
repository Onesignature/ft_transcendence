import Onion, { Component } from "../../onion/index.js";

export default class Route extends Component
{
    renderComponent(location, partialProps)
    {
        const { path, component } = this.props;
        const exact = !!(this.props.exact != undefined && this.props.exact != null);
        const match = exact ? location === path : location.startsWith(path);
        const newProps = this.props.componentProps ? Object.assign({}, this.props.componentProps, partialProps) : partialProps;

        return match ? String.raw`<div className="${component}" ${Onion.objectToProps(newProps)}></div>` : "";
    }

    render()
    {
        return String.raw`
            ${this.renderComponent(this.context.location, this.context.props)}
        `;
    }
}
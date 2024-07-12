import { Component } from "../../onion/index.js";

export default class Router extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            location: window.location.pathname,
        };
        this.navigate = this.navigate.bind(this);
    }

    onMount()
    {
        super.onMount();
        window.addEventListener('popstate', this.handlePopState);
    }

    onUnmount()
    {
        super.onUnmount();
        window.removeEventListener('popstate', this.handlePopState);
    }

    handlePopState()
    {
        this.setState({ location: window.location.pathname });
    }

    navigate(path)
    {
        window.history.pushState({}, '', path);
        this.setState({ location: path });
    }

    render()
    {
        this.context.location = this.state.location;
        this.context.navigate = this.navigate;
        
        return String.raw`
            ${this.props.children}
        `;
    }
}
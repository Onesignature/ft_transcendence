import { Component } from "../../modules/onion/index.js";
import { Redirect, Route } from "../../modules/onion-router/index.js";

export default class ProtectedRoute extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            isAuthenticated: false,
            isLoading: true,
        };
    }

    async onMount()
    {
        // try
        // {
        //     const response = await fetch('http://localhost:3000/protected', {
        //         credentials: 'include',
        //     });
        
        //     if (response.ok)
        //         this.setState({ isAuthenticated: true, isLoading: false });
        //     else
        //         this.setState({ isAuthenticated: false, isLoading: false });
        // }
        // catch (error)
        // {
        //     this.setState({ isAuthenticated: false, isLoading: false });
        // }
        
        // TODO: do backend implementation above
        setTimeout(() => {
            this.setState({ isAuthenticated: true, isLoading: false });
        }, 1000);
    }

    render()
    {
        if (this.state.isLoading)
        {
            return String.raw`<span style="margin:2.5px;" class="d-flex spinner-border spinner-border-medium" role="status" aria-hidden="true"></span>`;
        }

        if (this.state.isAuthenticated)
        {
            return String.raw`
                <div className="${Route.name}" ${this.props.exact ? "exact": ""} path="${this.props.path}" component="${this.props.component}" componentProps="${this.props.componentProps}"></div>
            `;
        }

        return String.raw`
            <div className="${Redirect.name}" to="/login"></div>
        `;
    }
}
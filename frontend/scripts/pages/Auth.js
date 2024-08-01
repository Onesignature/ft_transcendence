import { Component } from "../../modules/onion/index.js";

export default class Auth extends Component
{
    constructor(props, context)
    {
        super(props, context);
        
        const url = new URL(window.location.href);
        this.code = url.searchParams.get('code');

        console.log(this.code);
    }

    async onMount()
    {
        try
        {
            const response = await fetch('http://0.0.0.0:8000/oauth/authToken/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: this.code,
                }),
            });
        
            if (response.ok)
            {
                const token = await response.json();
                console.log(token);
                this.context.navigate('/main-menu', { token });
            }
            else
            {
                console.error('Failed to fetch me:', response.status, response.statusText);
                alert('Authentication failed, please try again!');
                this.context.navigate('/login');
            }
        }
        catch (error)
        {
            console.error(error.message || error);
            this.context.navigate('/login');
        }
    }

    render()
    {   
        return String.raw`
            <span style="margin:2.5px;" class="d-flex spinner-border spinner-border-medium" role="status" aria-hidden="true"></span>;
        `;
    }
}

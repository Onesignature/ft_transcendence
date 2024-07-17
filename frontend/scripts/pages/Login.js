import { Component } from "../../modules/onion/index.js";
import BaseButton from "../components/BaseButton.js";
import PongLogo from "../components/PongLogo.js";

export default class Login extends Component
{

    constructor(props, state)
    {
        super(props, state);
        this.state = {
            isLoading: false,
        };
    }

    handleClick()
    {
        this.setState({isLoading: true});
        setTimeout(() => {
            this.onAuthenticated();
        }, 1000);
    }

    onAuthenticated()
    {
        this.context.navigate("/home");
    }

    render()
    {
        return String.raw`
            <div className=${PongLogo.name}></div>
            <h1 style="font-size: 20pt; color: white; text-transform: uppercase; font-weight: 700;">${this.context.localizeText("LOGIN_TITLE")}</h1>
            <h2 style="font-size: 15pt; color: #FFD335; margin-top: 5px; margin-bottom: 20px; text-transform: uppercase; font-weight: 700;">${this.context.localizeText("LOGIN_SUBTITLE")}</h2>
            <div style="font-size: 20pt" className=${BaseButton.name} text="${this.context.localizeText("LOGIN_BUTTON")}" onClick="${this.handleClick.name}" isDisabled=${this.state.isLoading} isLoading=${this.state.isLoading}></div>
        `;
    }
}
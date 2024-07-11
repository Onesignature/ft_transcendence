import { Component } from "../../modules/Onion/index.js";
import BaseButton from "../components/BaseButton.js";
import PongLogo from "../components/PongLogo.js";

export default class Home extends Component
{
    handleLogoutClick()
    {
        console.log('logout clicked');
        this.context.navigate('/login');
    }

    render()
    {
        return String.raw`
            <div className=${PongLogo.name}></div>
            <div style="font-size: 20pt" className=${BaseButton.name} text="Logout" onClick="${this.handleLogoutClick.name}"></div>
        `;
    }
}
import { Component } from "../../modules/Onion/index.js";
import BaseButton from "../components/BaseButton.js";
import PongLogo from "../components/PongLogo.js";

export default class Login extends Component
{

    loginHandler()
    {
        console.log("do login..");
    }

    render()
    {
        return String.raw`
            <div className=${PongLogo.name}></div>
            <h1 style="font-size: 20pt; color: white; text-transform: uppercase; font-weight: 700;">Enjoy the Pong</h1>
            <h2 style="font-size: 15pt; color: #FFD335; margin-top: 5px; margin-bottom: 20px; text-transform: uppercase; font-weight: 700;">Login with 42 account</h2>
            <div style="font-size: 20pt" className=${BaseButton.name} text="Login" onClick=${this.loginHandler}></div>
        `;
    }
}
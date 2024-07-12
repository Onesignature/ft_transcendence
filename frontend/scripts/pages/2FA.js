import { Component } from "../../modules/onion/index.js";
import BaseButton from "../components/BaseButton.js";
import CloseButton from "../components/CloseButton.js";

export default class TwoFactorAuth extends Component
{
    handleButtonConfirm() 
    {
        alert('Button Confirm clicked!');
    }
    handleButtonSendAgain() 
    {
        alert('Button Send Again clicked!');
    }
    handleCloseButtonClick() {
        alert('Close button clicked!');
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/2FA.css">
            <div class="window">
                <div class="window-header">
                    <div className=${CloseButton.name} onclick=${this.handleCloseButtonClick.name}></div>
                </div>        
                <div class="window-content">
                    <h2>Enter OTP</h2>
                    <input type="text" class="code-input" placeholder="******" maxlength="6" id="player1">
                    <div  className=${BaseButton.name} text="Send again" onclick=${this.handleButtonSendAgain.name}></div>
                    <div buttonstylepath="./styles/PlayButton.css" buttonclass="play-button" className=${BaseButton.name} text="Confirm" onclick=${this.handleButtonConfirm.name}></div>
                </div>
            </div>
        `;
    }
}
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
            <link rel="stylesheet" href="/styles/2FA.css">
            <div class="window">
                <div class="window-header">
                    <div className=${CloseButton.name} onСlick=${this.handleCloseButtonClick.name}></div>
                </div>        
                <div class="window-content">
                    <h2>${this.context.localizeText('ENTER_OTP')}</h2>
                    <input type="text" class="code-input" placeholder="******" maxlength="6" id="player1">
                    <div className=${BaseButton.name} text="${this.context.localizeText('SEND_AGAIN')}" onClick=${this.handleButtonSendAgain.name} ></div>
                    <div buttonStylePath="/styles/PlayButton.css" buttonClass="play-button" className=${BaseButton.name} text="${this.context.localizeText('CONFIRM')}" onClick=${this.handleButtonConfirm.name}></div>
                </div>
            </div>
        `;
    }
}
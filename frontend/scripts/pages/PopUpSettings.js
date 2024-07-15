import { Component } from "../../modules/onion/index.js";
import CloseButton from "../components/CloseButton.js";
import { LocalizationManager as loc } from "../../modules/localization/index.js";

export default class PopUpSettings extends Component
{

    handleLanguageChange() {
        alert( 'language selected!');
    }

    handle2FACheckboxChange() 
    {
        alert('2FA');
    }

    handleCloseButtonClick() {
        alert('Close button clicked!');
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/PopUpSettings.css">
            <div class="window">
                <div class="window-header">
                <div className=${CloseButton.name} onClick=${this.handleCloseButtonClick.name}></div>
                </div>
                <div class="window-content">
                    <h2>${loc.getString('SETTINGS')}</h2>
                    <div class="setting">
                        <span>${loc.getString('2FA')}</span>
                        <input type="checkbox" id="2fa" onClick="handle2FACheckboxChange()">
                    </div>
                    <div class="setting">
                        <span>${loc.getString('LANGUAGE')}</span>
                        <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="English" id="lang-en" onClick="handleLanguageChange()">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" alt="French" id="lang-fr" onClick="handleLanguageChange()">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg" alt="Spanish" id="lang-es" onClick="handleLanguageChange()">
                    </div>
                </div>
            </div>
        `;
    }
}
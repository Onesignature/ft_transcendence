import { Component } from "../../modules/onion/index.js";
import CloseButton from "../components/CloseButton.js";

export default class PopUpSettings extends Component
{

    handleLanguageChangeToEn()
    {
        this.context.setLanguage('en');
    }

    handleLanguageChangeToFr()
    {
        this.context.setLanguage('fr');
    }

    handleLanguageChangeToEs()
    {
        this.context.setLanguage('es');
    }

    handle2FAChange() 
    {
        alert('2FA');
    }

    handleCloseButtonClick()
    {
        this.context.navigate("/main-menu");
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="/styles/PopUpSettings.css">
            <div class="window">
                <div class="window-header">
                    <div className="${CloseButton.name}" onClick="${this.handleCloseButtonClick.name}"></div>
                </div>
                <div class="window-content">
                    <h2>${this.context.localizeText('SETTINGS')}</h2>
                    <div class="setting">
                        <span>${this.context.localizeText('2FA')}</span>
                        <input type="checkbox" id="2fa" onClick="${this.handle2FAChange.name}">
                    </div>
                    <div class="setting">
                        <span>${this.context.localizeText('LANGUAGE')}</span>
                        <img ${this.context.language === "en" ? "class='selected'" : ""} src="./assets/icons/Flag_of_the_United_States.svg" alt="English" id="lang-en" onClick="${this.handleLanguageChangeToEn.name}">
                        <img ${this.context.language === "fr" ? "class='selected'" : ""} src="./assets/icons/Flag_of_France.svg" alt="French" id="lang-fr" onClick="${this.handleLanguageChangeToFr.name}">
                        <img ${this.context.language === "es" ? "class='selected'" : ""} src="./assets/icons/Flag_of_Spain.svg" alt="Spanish" id="lang-es" onClick="${this.handleLanguageChangeToEs.name}">
                    </div>
                </div>
            </div>
        `;
    }
}
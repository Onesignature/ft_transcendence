import { Component } from "../../modules/onion/index.js";
import BaseButton from "../components/BaseButton.js";
import PongLogo from "../components/PongLogo.js";
import { LocalizationManager as loc } from "../../modules/localization/index.js";

export default class MainMenu extends Component
{

    handleButtonClickPlay() 
    {
        alert('Button Play clicked!');
    }
    
    handleButtonClickTournament() 
    {
        alert('Button Tournament clicked!');
    }

    handleButtonClickSettings() 
    {
        alert('Button Settings clicked!');
    }

    handleButtonClickLogOut() 
    {
        alert('Button Log out clicked!');
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/MainMenu.css">
            <div class="profile-container">
                <img id="profile-picture" class="profile-picture" src="./assets/icons/DefaultProfilePicture.svg" alt="Profile Picture">
                <div id="username" class="username">username</div>
            </div>
            <div className=${PongLogo.name}></div>
            <div buttonStylePath="./styles/PlayButton.css" buttonClass="play-button" className=${BaseButton.name} text="${loc.getString('PLAY')}" onClick=${this.handleButtonClickPlay.name}></div>
            <div style="font-size: 20pt" className=${BaseButton.name} text="${loc.getString('TOURNAMENT')}" onClick=${this.handleButtonClickTournament.name}></div>
            <div style="font-size: 20pt" className=${BaseButton.name} text="${loc.getString('SETTINGS')}" onClick=${this.handleButtonClickSettings.name}></div>
            <div buttonStylePath="./styles/LogoutButton.css" buttonClass="logout-button" className=${BaseButton.name} text="${loc.getString('LOGOUT')}" onClick=${this.handleButtonClickLogOut.name}></div>
        `;
    }
}
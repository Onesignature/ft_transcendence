import { Component } from "../../modules/Onion/index.js";
import BaseButton from "../components/BaseButton.js";
import PongLogo from "../components/PongLogo.js";

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
                <img id="profile-picture" class="profile-picture" src="../src/pictures/DefaultProfilePicture.svg" alt="Profile Picture">
                <div id="username" class="username">username</div>
            </div>
            <div className=${PongLogo.name}></div>
            <div style="font-size: 25pt; border: 2px solid #FFD335; color: #FFD335;" className=${BaseButton.name} text="Play" onclick=${this.handleButtonClickPlay.name}></div>
            <div style="font-size: 20pt" className=${BaseButton.name} text="Tournament" onclick=${this.handleButtonClickTournament.name}></div>
            <div style="font-size: 20pt" className=${BaseButton.name} text="Settings" onclick=${this.handleButtonClickSettings.name}></div>
            <div style="font-size: 20pt" className=${BaseButton.name} text="Logout" onclick=${this.handleButtonClickLogOut.name}></div>
        `;
    }
}
import { Component } from "../../modules/onion/index.js";
import BaseButton from "../components/BaseButton.js";
import PongLogo from "../components/PongLogo.js";
import PopUpConfirmation from "../components/PopUpConfirmation.js";

export default class MainMenu extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            showModal: false
        };
    }

    handleButtonClickPlay() 
    {
        this.context.navigate("/game-mode");
    }
    
    handleButtonClickTournament() 
    {
        this.context.navigate("/tournament");
    }

    handleButtonClickSettings() 
    {
        this.context.navigate("/settings");
    }

    handleButtonClickLogOut() 
    {
        this.setState({showModal: true});
    }

    handleModalClose()
    {
        this.setState({showModal: false});
    }

    handleModalDone()
    {
        this.context.navigate("/login");
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="/styles/MainMenu.css">
            <div class="profile-container">
                <img id="profile-picture" class="profile-picture" src="./assets/icons/DefaultProfilePicture.svg" alt="Profile Picture">
                <div id="username" class="username">username</div>
            </div>
            <div className="${PongLogo.name}"></div>
            <div buttonStylePath="/styles/PlayButton.css" buttonClass="play-button" className="${BaseButton.name}" text="${this.context.localizeText('PLAY')}" onClick="${this.handleButtonClickPlay.name}"></div>
            <div style="font-size: 20pt" className="${BaseButton.name}" text="${this.context.localizeText('TOURNAMENT')}" onClick="${this.handleButtonClickTournament.name}"></div>
            <div style="font-size: 20pt" className="${BaseButton.name}" text="${this.context.localizeText('SETTINGS')}" onClick="${this.handleButtonClickSettings.name}"></div>
            <div buttonStylePath="/styles/LogoutButton.css" buttonClass="logout-button" className="${BaseButton.name}" text="${this.context.localizeText('LOGOUT')}" onClick="${this.handleButtonClickLogOut.name}"></div>
            ${this.state.showModal ? String.raw`<div className="${PopUpConfirmation.name}" message="Are you sure you want to logout?" onClickClose="${this.handleModalClose.name}" onClickDone="${this.handleModalDone.name}"></div>` : ""}
        `;
    }
}
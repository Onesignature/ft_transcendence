import { Component } from "../../modules/onion/index.js";
import BaseButton from "../components/BaseButton.js";
import CloseButton from "../components/CloseButton.js";
import { LocalizationManager as loc } from "../../modules/localization/index.js";

export default class PopUpTournament extends Component
{
    handleButtonStart() 
    {
        const player1 = document.getElementById('player1').value;
        const player2 = document.getElementById('player2').value;
        const player3 = document.getElementById('player3').value;
        const player4 = document.getElementById('player4').value;
        alert(`Players: ${player1}, ${player2}, ${player3}, ${player4}`);
    }
    handleCloseButtonClick() {
        alert('Close button clicked!');
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/PopUpTournament.css">
            <div class="window">
                <div class="window-header">
                    <div className=${CloseButton.name} onclick=${this.handleCloseButtonClick.name}></div>
                </div>        
                <div class="window-content">
                    <h2>${loc.getString('ALIAS_NAME')}</h2>
                    <div>
                        <input type="text" class="alias-input" placeholder="Player1" id="player1">
                        <input type="text" class="alias-input" placeholder="Player2" id="player2">
                    </div>
                    <div>
                        <input type="text" class="alias-input" placeholder="Player3" id="player3">
                        <input type="text" class="alias-input" placeholder="Player4" id="player4">
                    </div>
                    <div buttonstylepath="./styles/BaseButton.css" buttonclass="base-button" className=${BaseButton.name} text="Start" onclick=${this.handleButtonStart.name}></div>
                </div>
            </div>
        `;
    }
}
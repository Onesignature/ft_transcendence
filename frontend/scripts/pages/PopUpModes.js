import { Component } from "../../modules/Onion/index.js";
import BaseButton from "../components/BaseButton.js";
import CloseButton from "../components/CloseButton.js";
import ModesButton from "../components/ModesButton.js";

export default class PopUpModes extends Component
{
    handleAiButtonClick() 
    {
        alert('Button Ai clicked!');
    }
    handlePvPButtonClick() 
    {
        alert('Button PvP clicked!');
    }
    handleCloseButtonClick() {
        alert('Close button clicked!');
    }

    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/PopUpModes.css">
            <div class="window">
                <div class="window-header">
                    <div className=${CloseButton.name} onclick=${this.handleCloseButtonClick.name}></div>
                </div>        
                <div class="window-content">
                    <h2>Choose the mode</h2>
                    <div className=${ModesButton.name} text="PvP" onclick=${this.handlePvPButtonClick.name}></div>
                    <div className=${ModesButton.name} text="AI" onclick=${this.handlePvPButtonClick.name}></div>
                </div>
            </div>
        `;
    }
}
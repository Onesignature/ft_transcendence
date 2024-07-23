import { Component } from "../../modules/onion/index.js";
import BaseButton from "../components/BaseButton.js";
import PongLogo from "../components/PongLogo.js";

export default class Winner extends Component
{
    constructor() {
        super();
    }

    handleButtonClickMainMenu() 
    {
        alert('Button Main Menu clicked!');
    }

    createConfetti()
    {
        const confettiCount = 150; // Increase number of confetti elements
        const colors = ['#FFD335', '#FF4A4A', '#00E7FD', '#7100FE'];
        let confettiHTML = '';
    
        for (let i = 0; i < confettiCount; i++) {
            const left = `${Math.random() * 100}vw`;
            const animationDelay = `${Math.random() * 3}s`;
            const backgroundColor = colors[i % colors.length];
    
            confettiHTML += String.raw`<div class="confetti" style="left: ${left}; animation-delay: ${animationDelay}; background-color: ${backgroundColor};"></div>`;
        }
    
        return confettiHTML;
    }
    
    
    render()
    {   
        return String.raw`
            <link rel="stylesheet" href="/styles/Winner.css">
            <div className=${PongLogo.name}></div>
            <h2 style="font-size: 70pt; color: #FFD335;">${this.context.localizeText('VICTORY')}</h2>
            <img style="width: 4%; margin-bottom: 10px;" src="./assets/icons/CrownIcon.svg" alt="Crown Icon">
            
            <div class="winner-name" id="winner-name">bsaeed</div>
            <div buttonstylepath="/styles/BaseButton.css" buttonclass="base-button" className=${BaseButton.name} text="${this.context.localizeText('MAIN_MENU')}" onClick=${this.handleButtonClickMainMenu.name}></div>
            ${this.createConfetti()}
        `;
    }
}

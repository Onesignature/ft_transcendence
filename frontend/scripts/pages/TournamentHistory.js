import { Component } from "../../modules/onion/index.js";
import BackButton from "../components/BackButton.js";
import PopUpConfirmation from "../components/PopUpConfirmation.js";
import { LocalizationManager as loc } from "../../modules/localization/index.js";

export default class TournamentHistory extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = { showModal: false };
    }

    showExitConfirmation() {
        this.setState({showModal: true});
    }

    handleModalClose() {
        this.setState({showModal: false});
    }
    handleModalDone()
    {
        alert('Exiting...');
    }
    handleStartButtonClick(){
        alert('Starting...'); 
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
            <link rel="stylesheet" href="./styles/TournamentHistory.css">
            <div className=${BackButton.name} text="▲" onClick=${this.showExitConfirmation.name}>▲</div>
            <div class="container">
                <h1 class="header">${loc.getString('TOURNAMENT')}</h1>
                <div class="matches">
                    <div class="match current" id="match1">
                        <h2 class="sub-header">${loc.getString('MATCH')} 1</h2>
                        <div class="player" id="player1">muganiev</div>
                        <div class="player" id="player2">bsaeed</div>
                    </div>
                    <div class="match" id="match2">
                        <h2 class="sub-header">${loc.getString('MATCH')} 2</h2>
                        <div class="player" id="player3">fkhan</div>
                        <div class="player" id="player4">gchernys</div>
                    </div>
                </div>
                <div class="match" id="match3">
                    <h2 class="sub-header">${loc.getString('MATCH')} 3</h2>
                    <div class="player" id="player5"></div>
                    <div class="player" id="player6"></div>
                </div>
                <div class="match" id="match-winner">
                    <img style="width: 20%; margin-bottom: 10px;" src="./assets/icons/CrownIcon.svg" alt="Crown Icon">
                    <h2 class="sub-header">${loc.getString('WINNER')}</h2>
                    <div class="player" id="player7"></div>
                </div>
                <button class="btn-start" id="StartButton" onClick="handleStartButtonClick()">${loc.getString('START')} </button>
            </div>
            ${this.createConfetti()}
            ${this.state.showModal ? String.raw`<div id="exitModal" className="${PopUpConfirmation.name}" onClickClose="${this.handleModalClose.name}" onClickDone="${this.handleModalDone.name}"></div>` : ""}
        `;
    }
}
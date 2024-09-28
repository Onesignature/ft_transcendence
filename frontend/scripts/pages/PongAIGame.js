import { Component } from "../../modules/onion/index.js";
import AILogo from "../components/AILogo.js";
import BackButton from "../components/BackButton.js";
import PlayerInfo from "../components/PlayerInfo.js";
import PongGameBoard from "../components/PongGameBoard.js";
import PongGameBoard3D from "../components/PongGameBoard3D.js";
import PopUpConfirmation from "../components/PopUpConfirmation.js";
import Loser from "./Loser.js";
import Winner from "./Winner.js";

export default class PongAIGame extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            scoreOne: 0,
            scoreTwo: 0,
            showModal: false,
            showPerspective: true
        };
        this.maxScore = 5;
        this.playerOneName = "Player 1";
        this.playerTwoName = "AI";
    }

    updateScore(scoreOne, scoreTwo)
    {
        if (this.state.scoreOne != scoreOne || this.state.scoreTwo != scoreTwo)
        {
            this.setState({ scoreOne, scoreTwo });
        }
    }

    handleModalOpen()
    {
        this.setState({showModal: true});
    }

    handleTogglePerspective()
    {
        const toggle = !this.state.showPerspective;
        this.setState({showPerspective: toggle});
    }

    handleModalClose()
    {
        this.setState({showModal: false});
    }

    handleModalDone()
    {
        this.context.navigate("/main-menu");
    }

    render()
    {
        const { scoreOne, scoreTwo, showModal, showPerspective } = this.state;

        if (scoreOne >= this.maxScore)
        {
            return String.raw`
                <div className="${Winner.name}" playerName="${this.playerOneName}"></div>
            `;
        }
        else if (scoreTwo >= this.maxScore)
        {
            return String.raw`
                <div className="${Loser.name}" playerName="${this.playerOneName}"></div>
            `;
        }
        return String.raw`
            <link rel="stylesheet" href="/styles/PongNormalGame.css">
            <div className="${BackButton.name}" text="▲" onClick="${this.handleModalOpen.name}">▲</div>
            <div buttonStylePath="/styles/PerspectiveButton.css" buttonClass="perspective-button" className="${BaseButton.name}" text=${showPerspective ? "2D" : "3D"} onClick="${this.handleTogglePerspective.name}">▲</div>
            <div class="gameContainer">
                <div className="${AILogo.name}"></div>
                <div className="${PlayerInfo.name}" playerOne="${this.playerOneName}" playerTwo="${this.playerTwoName}" scoreOne="${scoreOne}" scoreTwo="${scoreTwo}"></div>
                <div className="${showPerspective ? PongGameBoard3D.name : PongGameBoard.name}" pause="${showModal}" isAIEnabled="true" onClickUpdateScore="${this.updateScore.name}" scoreOne="${scoreOne}" scoreTwo="${scoreTwo}"></div>
            </div>
            ${showModal ? String.raw`<div className="${PopUpConfirmation.name}" message="${this.context.localizeText('YOU_SURE')}" onClickClose="${this.handleModalClose.name}" onClickDone="${this.handleModalDone.name}"></div>` : ""}
        `;
    }
}

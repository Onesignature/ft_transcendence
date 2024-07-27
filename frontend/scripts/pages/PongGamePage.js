import { Component } from "../../modules/onion/index.js";
import BackButton from "../components/BackButton.js";
import PlayerInfo from "../components/PlayerInfo.js";
import PongGameBoard from "../components/PongGameboard.js";
import PopUpConfirmation from "../components/PopUpConfirmation.js";

export default class PongGamePage extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            scoreOne: 0,
            scoreTwo: 0,
            showModal: false
        };
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

    handleModalClose()
    {
        this.setState({showModal: false});
    }

    handleModalDone()
    {
        this.context.navigate("/mainMenu");
    }

    render()
    {
        const { scoreOne, scoreTwo, showModal } = this.state;

        return String.raw`
            <link rel="stylesheet" href="/styles/PongGamePage.css">
            <div className="${BackButton.name}" text="▲" onClick="${this.handleModalOpen.name}">▲</div>
            <div class="gameContainer">
                <div className="${PlayerInfo.name}" playerOne="Player 1" playerTwo="Player 2" scoreOne="${scoreOne}" scoreTwo="${scoreTwo}"></div>
                <div className="${PongGameBoard.name}" pause="${showModal}" onClickUpdateScore="${this.updateScore.name}" scoreOne="${scoreOne}" scoreTwo="${scoreTwo}"></div>
            </div>
            ${showModal ? String.raw`<div className="${PopUpConfirmation.name}" onClickClose="${this.handleModalClose.name}" onClickDone="${this.handleModalDone.name}"></div>` : ""}
        `;
    }
}

import { Component } from '../../modules/onion/index.js';

export default class PopUpConfirmation extends Component
{
    render()
    {
        return String.raw`
            <link rel="stylesheet" href="/styles/PopUpConfirmation.css">
            <div class="modal">
                <div class="modal-content">
                    <p>Are you sure you want to exit?</p>
                    <button class="modal-button yes-button" onClick="${this.props.onClickDone.name}">Yes</button>
                    <button class="modal-button no-button" onClick="${this.props.onClickClose.name}">No</button>
                </div>
            </div>
        `;
    }
}
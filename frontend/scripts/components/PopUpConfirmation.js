import { Component } from '../../modules/Onion/index.js';

export default class PopUpConfirmation extends Component
{
    render()
    {
        return String.raw`
            <link rel="stylesheet" href="./styles/PopUpConfirmation.css">
            <div id="exitModal" class="modal">
                <div class="modal-content">
                    <p>Are you sure you want to exit?</p>
                    <button class="modal-button yes-button" onclick="${this.props.onClickDone}">Yes</button>
                    <button class="modal-button no-button" onclick="${this.props.onClickClose}">No</button>
                </div>
            </div>
        `;
    }
}
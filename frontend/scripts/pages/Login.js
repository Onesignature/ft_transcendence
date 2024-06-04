import { Component } from "../../modules/Onion/index.js";
import BaseButton from "../components/BaseButton.js";

export default class Login extends Component {

    render()
    {
        return String.raw`
            <div>
                <div className="${BaseButton.name}" text="Play" />
                <div className="${BaseButton.name}" text="Tournament" />
                <div className="${BaseButton.name}" text="Settings" />
                <div className="${BaseButton.name}" text="Logout" />
            </div>
        `;
    }
}
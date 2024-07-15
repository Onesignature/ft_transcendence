import { Component } from '../modules/onion/index.js';
import { Router, Routes, Route, Link } from '../modules/onion-router/index.js';
import Login from './pages/Login.js';
import MainMenu from './pages/MainMenu.js';
import PopUpSettings from './pages/PopUpSettings.js';
import TournamentHistory from './pages/TournamentHistory.js';
import TwoFactorAuth from './pages/2FA.js';

export default class App extends Component
{
    render()
    {
        return String.raw`
            <div className=${Router.name}>
                <div class="d-flex justify-content-center flex-column align-items-center vh-100">
                    <div className=${Routes.name}>
                        <div className=${Route.name} exact path="/" component=${TournamentHistory.name}></div>
                        <div className=${Route.name} path="/login" component=${Login.name}></div>
                        <div className=${Route.name} path="/mainMenu" component=${MainMenu.name}></div>
                    </div>
                </div>
            </div>
        `;
    }
}
import { Component } from '../modules/onion/index.js';
import { Router, Routes, Route } from '../modules/onion-router/index.js';

import LanguageProvider from './components/LanguageProvider.js';
import ProtectedRoute from './components/ProtectedRoute.js';

import Login from './pages/Login.js';
import MainMenu from './pages/MainMenu.js';
import TwoFactorAuth from './pages/2FA.js';
import PopUpSettings from './pages/PopUpSettings.js';
import PopUpModes from './pages/PopUpModes.js';
import TournamentHistory from './pages/TournamentHistory.js';
import PongGamePage from './pages/PongGamePage.js';

export default class App extends Component
{
    render()
    {
        return String.raw`
            <div class="d-flex justify-content-center flex-column align-items-center vh-100">
                <div className=${LanguageProvider.name}>
                    <div className=${Router.name}>
                        <div className=${Routes.name}>
                            <div className=${Route.name} path="/login" component=${Login.name}></div>
                            <div className=${ProtectedRoute.name} path="/2fa" component=${TwoFactorAuth.name}></div>
                            <div className=${ProtectedRoute.name} path="/home" component=${MainMenu.name}></div>
                            <div className=${ProtectedRoute.name} path="/playMode" component=${PopUpModes.name}></div>
                            <div className=${ProtectedRoute.name} path="/game/pvp" component=${PongGamePage.name}></div>
                            <div className=${ProtectedRoute.name} path="/settings" component=${PopUpSettings.name}></div>
                            <div className=${ProtectedRoute.name} path="/tournament" component=${TournamentHistory.name}></div>
                            <div className=${ProtectedRoute.name} path="/" component=${MainMenu.name}></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}